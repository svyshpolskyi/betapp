import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RoutesRecognized } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { getSelectedMatches } from "./store/admin-match-selector.selectors";
import { getSubmittedMatchesSuccessStatus } from "../../store/app.selectors";
import * as AppActions from "../../store/app.actions";
import { filter, pairwise, switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-admin-new-matches-section",
  templateUrl: "./admin-new-matches-section.component.html"
})
export class AdminNewMatchesSectionComponent implements OnInit, OnDestroy {
  routeSubscription$;
  selectedMatches$;
  isSubmittedMatchesSuccess$;
  constructor(private store: Store<{ matches }>, private router: Router) {
    this.routeSubscription$ = this.router.events.pipe(
      filter(e => e instanceof RoutesRecognized),
      pairwise(),
      tap(console.log)
    );
  }
  ngOnInit() {
    this.selectedMatches$ = this.store.select(getSelectedMatches).pipe(
      tap(matches => {
        // if (matches.length) {
        //   this.router.navigate(["/admin/2019-02-27"]);
        // }
      })
    );
    this.isSubmittedMatchesSuccess$ = this.store.pipe(
      select(getSubmittedMatchesSuccessStatus)
    );
  }

  ngOnDestroy() {
    this.store.dispatch(new AppActions.SubmitMatchesReset());
    // this.routeSubscription$.unsubscribe();
  }
}
