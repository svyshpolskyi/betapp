import { Component, OnInit } from "@angular/core";
import { BetSectionService } from "./bet-section.service";
import { AngularFireList } from "@angular/fire/database";
import { map, tap } from "rxjs/operators";
import { pipe } from "rxjs";
import { select, Store } from "@ngrx/store";
import * as BetMatchActions from "./store/bet-section.actions";

@Component({
  selector: "app-bet-section",
  templateUrl: "./bet-section.component.html"
})
export class BetSectionComponent implements OnInit {
  viewMode = "user";
  matchDetails$;
  constructor(
    private betSectionService: BetSectionService,
    private store: Store<{}>
  ) {}

  ngOnInit() {
    this.matchDetails$ = this.betSectionService.getMatches().pipe(
      map(data => {
        this.store.dispatch(
          new BetMatchActions.LoadBetMatches(
            data.matches.map(match => ({
              fixture_id: match.fixture_id,
              awayTeam: match.awayTeam,
              homeTeam: match.homeTeam,
              awayTeamBetScore: undefined,
              homeTeamBetScore: undefined
            }))
          )
        );
        return data;
      })
    );
  }
}
