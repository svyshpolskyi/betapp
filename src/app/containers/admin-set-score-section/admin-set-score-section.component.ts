import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AdminSetScoresSectionService } from "./admin-set-score-section.service";
import { map, take, tap } from "rxjs/operators";
import * as SetScoreActions from "./store/admin-set-score-section.actions";
import { getSubmissionResultsState } from "./store/admin-set-score-section.selectors";

@Component({
  selector: "app-admin-set-score-section",
  templateUrl: "./admin-set-score-section.component.html",
  styleUrls: ["./admin-set-score-section.component.scss"]
})
export class AdminSetScoreSectionComponent implements OnInit, OnDestroy {
  matchesToSetScore$;
  resultsSubmissionState$;
  constructor(
    private adminSetScoresSectionService: AdminSetScoresSectionService,
    private store: Store<{}>
  ) {}

  ngOnInit() {
    this.matchesToSetScore$ = this.adminSetScoresSectionService.getMatchesToSetScore();
    this.resultsSubmissionState$ = this.store.select(getSubmissionResultsState);
  }

  submitResults() {
    this.store.dispatch(new SetScoreActions.SetRoundResult());
    return this.adminSetScoresSectionService
      .getResultsToSubmit()
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.adminSetScoresSectionService
          .submitScoresMethod(data.currentRoundId, data.matches)
          .subscribe(() => {
            this.store.dispatch(new SetScoreActions.SetRoundResultSuccess());
            document.documentElement.scrollTop = 0;
          });
      });
  }

  ngOnDestroy() {
    this.store.dispatch(new SetScoreActions.ResetRoundResult());
  }
}
