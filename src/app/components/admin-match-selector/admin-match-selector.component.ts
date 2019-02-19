import { Component, OnInit } from "@angular/core";
import { leagues } from "../../constants/leagues";
import { FetchService } from "../../services/fetch.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminMatchSelectorService } from "./admin-match-selector.service";
import { select, Store } from "@ngrx/store";
import * as MatchActions from "./store/admin-match-selector.actions";
import { combineLatest, Observable, of } from "rxjs";
import {
  catchError,
  concatMap,
  first,
  map,
  switchMap,
  take
} from "rxjs/operators";
import {
  getLoadedMatches,
  getLoadingStatus,
  getFailedStatus
} from "./store/admin-match-selector.selectors";

@Component({
  selector: "app-admin-match-selector",
  templateUrl: "./admin-match-selector.component.html",
  styleUrls: ["./admin-match-selector.component.scss"]
})
export class AdminMatchSelectorComponent implements OnInit {
  fixtures;
  roundsQuantity$: Observable<{}>;
  supportedLeagueIDs;
  date;
  selectedMatches = [];
  selectedMatches$: Observable<any>;
  error;
  isLoading$;
  isFailed$;

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
                    console.log(err);
                    this.store.dispatch(new MatchActions.LoadMatchesFailure());
                    return of({ error: true });
                  })
                );
            })
          );
        })
      )
      .subscribe(data => {
        console.log(data);
        this.fixtures = data["matches"];
        if (!data["error"]) {
          this.store.dispatch(new MatchActions.LoadMatchesSuccess(data));
        }
      });
    this.selectedMatches$ = this.store.pipe(
      select("matches"),
      map(data => ({ matches: data.selectedMatches }))
    );
  }

  onMatchSelected(selectedMatch) {
    this.store.dispatch(new MatchActions.AddMatches(selectedMatch));
  }
  addMatches(matches) {
    combineLatest(this.selectedMatches$, this.roundsQuantity$)
      .pipe(
        take(1),
        map(data => ({
          matches: data[0].matches,
          tournament_round: data[1]["tournament_round"]
        })),
        switchMap(data =>
          this.adminMatchesSelectorService.addSelectedMatches(data)
        )
      )
      .subscribe();
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
