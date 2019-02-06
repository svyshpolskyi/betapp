import { Component, OnInit } from "@angular/core";
import { leagues } from "../../constants/leagues";
import { FetchService } from "../../services/fetch.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AdminMatchSelectorService } from "./admin-match-selector.service";
import { select, Store } from "@ngrx/store";
import * as MatchActions from "./store/admin-match-selector.actions";

@Component({
  selector: "app-admin-match-selector",
  templateUrl: "./admin-match-selector.component.html",
  styleUrls: ["./admin-match-selector.component.scss"]
})
export class AdminMatchSelectorComponent implements OnInit {
  fixtures$;
  roundsQuantity;
  supportedLeagueIDs;
  allMatches;
  date;
  selectedMatches = [];
  selectedMatches$;
  logoURLs = [];
  error;
  viewMode = "admin";

  constructor(
    private fetchService: FetchService,
    private af: AngularFireDatabase,
    private route: ActivatedRoute,
    private router: Router,
    private adminMatchesSelectorService: AdminMatchSelectorService,
    private store: Store<{ matches }>
  ) {}

  ngOnInit() {
    this.supportedLeagueIDs = Object.keys(leagues.api.leagues);
    this.adminMatchesSelectorService
      .getRoundsQuantity()
      .subscribe(roundsQuantity => (this.roundsQuantity = roundsQuantity));
    this.route.params.subscribe((params: Params) => {
      this.fixtures$ = this.adminMatchesSelectorService.getFixtures(
        params["date"]
      );
    });
  }

  onMatchSelected(selectedMatch) {
    this.selectedMatches = selectedMatch.selected
      ? [...this.selectedMatches, selectedMatch]
      : this.selectedMatches.filter(
          match => match.fixture_id !== selectedMatch.fixture_id
        );
    this.store.dispatch(new MatchActions.AddMatches(this.selectedMatches));
  }
  addMatches(matches) {
    this.af.list("/data/tournament").push({
      tournament_round: this.roundsQuantity.length + 1,
      matches
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
