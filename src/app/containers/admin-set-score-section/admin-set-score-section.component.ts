import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AdminSetScoresSectionService } from "./admin-set-score-section.service";
import { map, take, tap } from "rxjs/operators";

@Component({
  selector: "app-admin-set-score-section",
  templateUrl: "./admin-set-score-section.component.html",
  styleUrls: ["./admin-set-score-section.component.scss"]
})
export class AdminSetScoreSectionComponent implements OnInit {
  matchesToSetScore$;
  constructor(
    private adminSetScoresSectionService: AdminSetScoresSectionService
  ) {}

  ngOnInit() {
    this.matchesToSetScore$ = this.adminSetScoresSectionService.getMatchesToSetScore();
  }

  submitResults() {
    return this.adminSetScoresSectionService
      .getResultsToSubmit()
      .pipe(take(1))
      .subscribe(data => {
        console.log(data);
        this.adminSetScoresSectionService.submitScoresMethod(
          data.currentRoundId,
          data.matches
        );
      });
  }
}
