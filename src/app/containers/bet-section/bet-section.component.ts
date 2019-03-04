import { Component, OnDestroy, OnInit } from "@angular/core";
import { BetSectionService } from "./bet-section.service";
import { AngularFireList } from "@angular/fire/database";
import { first, map, switchMap, tap } from "rxjs/operators";
import { of, pipe } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as BetMatchActions from "./store/bet-section.actions";
import * as AppActions from "../../store/app.actions";
import { ActivatedRoute } from "@angular/router";
import { getBetMatches, getCurrentRound } from "./store/bet-section.selectors";
import { AuthService } from "../../core/auth.service";
import { getUserId } from "../../store/app.selectors";

@Component({
  selector: "app-bet-section",
  templateUrl: "./bet-section.component.html",
  styleUrls: ["./bet-section.component.scss"]
})
export class BetSectionComponent implements OnInit, OnDestroy {
  viewMode = "user";
  matchDetails$;
  userId$;
  userId;
  currentRound$;
  currentRound;
  userIdSubscription;
  constructor(
    private betSectionService: BetSectionService,
    private store: Store<{}>,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit() {
    // this.matchDetails$ = this.betSectionService.getMatches().pipe(
    //   map(data => {
    //     this.store.dispatch(
    //       new BetMatchActions.LoadBetMatches(
    //         data.matches.map(match => ({
    //           fixture_id: match.fixture_id,
    //           awayTeam: match.awayTeam,
    //           homeTeam: match.homeTeam,
    //           awayTeamBetScore: undefined,
    //           homeTeamBetScore: undefined
    //         }))
    //       )
    //     );
    //     return data;
    //   })
    // );
    this.userId$ = this.store
      .select(getUserId)
      .subscribe(userId => (this.userId = userId));
    this.currentRound$ = this.store
      .select(getCurrentRound)
      .subscribe(round => (this.currentRound = round));
    this.matchDetails$ = this.store.select(getBetMatches).pipe(
      switchMap(data => {
        if (data.matches) {
          return of(data);
        }
        return this.betSectionService.getMatches().pipe(
          tap(fbData => {
            this.store.dispatch(new BetMatchActions.LoadBetMatches(fbData));
          })
        );
      })
    );
  }

  resetSelections() {
    this.store.dispatch(new BetMatchActions.ResetSelections());
  }

  submitBet(key, round, data) {
    return this.betSectionService.submitBetMethod(key, round, data);
  }

  ngOnDestroy() {
    this.userId$.unsubscribe();
    this.currentRound$.unsubscribe();
  }
}
