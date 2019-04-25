import { Component, OnInit } from "@angular/core";
import { leagues } from "../../constants/leagues";
import { FetchService } from "../../services/fetch.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminMatchSelectorService } from "./admin-match-selector.service";
import { select, Store } from "@ngrx/store";
import * as MatchActions from "../../containers/admin-new-matches-section/store/admin-match-selector.actions";
import { combineLatest, Observable, of } from "rxjs";
import * as AppActions from "../../store/app.actions";
import * as BetMatchActions from "../../containers/bet-section/store/bet-section.actions";
import {
  catchError,
  concatMap,
  first,
  map,
  switchMap,
  take,
  tap
} from "rxjs/operators";
import {
  getLoadedMatches,
  getLoadingStatus,
  getFailedStatus,
  getSelectedMatches,
  getSuccessStatus
} from "../../containers/admin-new-matches-section/store/admin-match-selector.selectors";

@Component({
  selector: "app-admin-match-selector",
  templateUrl: "./admin-match-selector.component.html",
  styleUrls: ["./admin-match-selector.component.scss"]
})
export class AdminMatchSelectorComponent implements OnInit {
  fixtures$;
  roundsQuantity$: Observable<{}>;
  supportedLeagueIDs;
  date;
  selectedMatches$: Observable<any>;
  error;
  isLoading$;
  isFailed$;
  isSuccess$;
  isSubmittedMatchesSuccess$;

  constructor(
    private fetchService: FetchService,
    private af: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private adminMatchesSelectorService: AdminMatchSelectorService,
    private store: Store<{}>
  ) {}

  ngOnInit() {
    this.supportedLeagueIDs = Object.keys(leagues.api.leagues);
    this.roundsQuantity$ = this.adminMatchesSelectorService.getRoundsQuantity();
    this.isLoading$ = this.store.pipe(select(getLoadingStatus));
    this.isFailed$ = this.store.pipe(select(getFailedStatus));
    this.isSuccess$ = this.store.pipe(select(getSuccessStatus));
    this.route.params
      .pipe(
        map(params => {
          this.store.dispatch(new MatchActions.LoadMatches());
          return params["date"];
        }),
        concatMap(date => {
          return this.store.select(getLoadedMatches, { date }).pipe(
            first(),
            switchMap(data => {
              if (data.matches) {
                return of({ ...data, isCached: true });
              }
              return this.adminMatchesSelectorService
                .getFixtures(data["date"])
                .pipe(
                  catchError(err => {
                    this.store.dispatch(new MatchActions.LoadMatchesFailure());
                    return of({ error: true });
                  })
                );
            })
          );
        })
      )
      .subscribe(data => {
        if (!data["error"]) {
          this.store.dispatch(new MatchActions.LoadMatchesSuccess(data));
          this.fixtures$ = this.store
            .select(getLoadedMatches, { date: data.date })
            .pipe(map(obj => obj.matches));
        }
      });
    this.selectedMatches$ = this.store
      .select(getSelectedMatches)
      .pipe(map(data => ({ matches: data })));
  }

  onMatchSelected(selectedMatch) {
    this.store.dispatch(new MatchActions.AddMatches(selectedMatch));
  }
  addMatches() {
    this.store.dispatch(new AppActions.SubmitMatchesStart());
    combineLatest(this.selectedMatches$, this.roundsQuantity$)
      .pipe(
        take(1),
        map(data => ({
          matches: data[0].matches,
          tournament_round: +data[1]["tournament_round"] + 1
        })),
        switchMap(data =>
          this.adminMatchesSelectorService.addSelectedMatches(data)
        )
      )
      .subscribe(response => {
        this.store.dispatch(new AppActions.SubmitMatchesSuccess());
        this.store.dispatch(new MatchActions.ResetSelections());
        this.store.dispatch(new BetMatchActions.ResetBetMatches());
        this.router.navigate(["/admin"]);
        // .then(nav =>
        //   this.store.dispatch(new AppActions.SubmitMatchesReset())
        // );
      });
  }

  // addLogos() {
  //   this.fetchService
  //     .getLogos(136)
  //     .subscribe(data =>
  //       this.af
  //         .list("/data")
  //         .update(
  //           "teamLogos",
  //           Object.keys(data["api"].teams).reduce(
  //             (acc, cur) => ({ ...acc, [cur]: data["api"].teams[cur].logo }),
  //             {}
  //           )
  //         )
  //     );
  // }
}
