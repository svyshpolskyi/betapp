import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { BetResultsSectionService } from "./bet-results-section.service";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { FetchService } from "../../services/fetch.service";
import { BetSectionService } from "../bet-section/bet-section.service";
import { of } from "rxjs";

@Component({
  selector: "app-bet-results-section",
  templateUrl: "./bet-results-section.component.html",
  styleUrls: ["./bet-results-section.component.scss"]
})
export class BetResultsSectionComponent implements OnInit {
  betResults$;
  isLoggedIn$;
  currentRound;
  totalPoints;
  constructor(
    private betResultsSectionService: BetResultsSectionService,
    private fetchService: FetchService,
    private betSectionService: BetSectionService,
    private store: Store<{}>
  ) {}

  ngOnInit() {
    this.betResults$ = this.betResultsSectionService.getRoundData().pipe(
      tap(data => {
        this.totalPoints = data.matches.reduce((acc, cur) => {
          return (acc += cur.points);
        }, 0);
      })
    );
    this.isLoggedIn$ = this.fetchService.getUserId();
  }
}
