import { Component, OnDestroy, OnInit } from "@angular/core";
import { BetSectionService } from "./bet-section.service";
import { AngularFireList } from "@angular/fire/database";
import { first, map, switchMap, take, tap } from "rxjs/operators";
import { forkJoin, of, pipe } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as BetMatchActions from "./store/bet-section.actions";
import * as AppActions from "../../store/app.actions";
import { ActivatedRoute } from "@angular/router";
import {
  getBetMatches,
  getCurrentRound,
  getMergedMatches,
  getSelectedBetMatches,
  getSelectedBetsStatus
} from "./store/bet-section.selectors";
import { AuthService } from "../../core/auth.service";
import { getUser, getUserId } from "../../store/app.selectors";
import { FetchService } from "../../services/fetch.service";

@Component({
  selector: "app-bet-section",
  templateUrl: "./bet-section.component.html",
  styleUrls: ["./bet-section.component.scss"]
})
export class BetSectionComponent implements OnInit {
  viewMode;
  matchDetails$;
  userId$;
  userId;
  isBetsSelected$;
  latestBet;
  constructor(
    private betSectionService: BetSectionService,
    private store: Store<{}>,
    private route: ActivatedRoute,
    private fetchService: FetchService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.isBetsSelected$ = this.store.select(getSelectedBetsStatus);
    this.userId$ = this.fetchService
      .getUserId()
      .pipe(
        tap(userId => {
          this.viewMode = userId ? "loggedUser" : "notLoggedUser";
          this.userId = userId;
        }),
        switchMap(userId => {
          return this.store.select(getBetMatches).pipe(
            switchMap(data => {
              if (data.matches) {
                return of(data);
              }
              return this.betSectionService.getMatches().pipe(
                tap(fbData => {
                  this.store.dispatch(
                    new BetMatchActions.LoadBetMatches(fbData)
                  );
                })
              );
            }),
            map(matchDetails => ({ userId, matchDetails }))
          );
        }),
        // switchMap(userId =>
        //   this.store
        //     .select(getCurrentRound)
        //     .pipe(map(round => ({ userId, round })))
        // ),
        switchMap(obj =>
          this.getLatestBet(obj.userId, obj.matchDetails.currentRound).pipe(
            tap(roundBet => {
              this.store.dispatch(
                new BetMatchActions.LoadLatestBet({
                  roundBet,
                  round: obj.matchDetails.currentRound
                })
              );
            }),
            map(data => ({
              userId: obj.userId,
              matchDetails: obj.matchDetails,
              roundBet: data
            }))
          )
        ),
        tap(data => (this.matchDetails$ = this.store.select(getMergedMatches)))
      )
      .subscribe(data => {
        this.latestBet = data.roundBet;
      });
    // this.matchDetails$ = this.store
    //   .select(getMergedMatches)
    //   .pipe(tap(console.log));
    // this.matchDetails$ = this.store.select(getBetMatches).pipe(
    //   switchMap(data => {
    //     if (data.matches) {
    //       return of(data);
    //     }
    //     return this.betSectionService.getMatches().pipe(
    //       tap(fbData => {
    //         this.store.dispatch(new BetMatchActions.LoadBetMatches(fbData));
    //       })
    //     );
    //   })
    // );
  }

  resetSelections() {
    this.store.dispatch(new BetMatchActions.ResetSelections());
  }

  submitBet(key, round) {
    // this.fetchService.getUser().subscribe(data => {
    //   console.log(data);
    //   this.fetchService.pushFBData("table", {
    //     displayName: data.displayName,
    //     userId: data.userID,
    //     points: 0
    //   });
    // });
    this.store.select(getSelectedBetMatches).subscribe(data => {
      this.betSectionService.submitBetMethod(key, round, { matches: data });
    });
  }

  getLatestBet(userId, round) {
    return this.betSectionService.getSubmittedBet(userId, round);
  }
  // this method merges initial match details data with already submitted bet
  mergeBetData(matchesData, bet) {}

  // ngOnDestroy() {
  //   this.userId$.unsubscribe();
  // }
}
