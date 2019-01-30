import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { leagues } from "../../constants/leagues";
import { FetchService } from "../../services/fetch.service";
import { AngularFireDatabase } from "@angular/fire/database";
import { HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map, takeWhile } from "rxjs/operators";

@Component({
  selector: "app-admin-match-selector",
  templateUrl: "./admin-match-selector.component.html",
  styleUrls: ["./admin-match-selector.component.scss"]
})
export class AdminMatchSelectorComponent implements OnInit, OnChanges {
  @Output() fixtureButtonPressed = new EventEmitter<any>();
  @Input() fixtures;
  @Input() roundsQuantity;
  supportedLeagueIDs;
  allMatches = [];
  dates;
  selectedMatches = [];
  logoURLs = [];
  error;
  viewMode = "admin";

  constructor(
    private fetchService: FetchService,
    private af: AngularFireDatabase
  ) {
    this.supportedLeagueIDs = Object.keys(leagues.api.leagues);
  }

  ngOnInit() {
    this.dates = this.getDates(5);
    this.getRoundsQuantity().subscribe(
      tournaments => (this.roundsQuantity = tournaments.length)
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.allMatches = !this.fixtures
      ? []
      : this.filterFixtures(this.fixtures.api.fixtures);
  }
  // method for getting the list of future matches based on date and the list of supported at the moment leagues (supportedLeagueIDs)
  showFixtures(date) {
    this.fixtureButtonPressed.emit(date.target.value);
  }

  filterFixtures(fixtures) {
    return Object.values(fixtures).filter(data =>
      this.supportedLeagueIDs.includes(data["league_id"])
    );
  }

  // method for getting the list of future 5 days dates and displaying it on buttons
  getDates(numberOfDays) {
    let currentDate = Date.now();
    return [...new Array(numberOfDays)].fill("").map((el, index, arr) => {
      const date = new Date(currentDate);
      currentDate += 86400000;
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    });
  }

  onMatchSelected(selectedMatch) {
    this.selectedMatches = selectedMatch.selected
      ? [...this.selectedMatches, selectedMatch]
      : this.selectedMatches.filter(
          match => match.fixture_id !== selectedMatch.fixture_id
        );
  }

  addMatches(matches) {
    this.af.list("/data/tournament").update(`${+this.roundsQuantity + 1}`, {
      tournament_round: `${+this.roundsQuantity + 1}`,
      matches
    });
    // console.log(this.roundsQuantity + 1);
  }

  getRoundsQuantity() {
    return this.fetchService.getFBData("/data/tournament");
  }

  addLogos() {
    // this.fetchService
    //   .getLogos(136)
    //   .subscribe(data =>
    //     this.af
    //       .list("/data")
    //       .update(
    //         "teamLogos",
    //         Object.keys(data["api"].teams).reduce(
    //           (acc, cur) => ({ ...acc, [cur]: data["api"].teams[cur].logo }),
    //           {}
    //         )
    //       )
    //   );
    console.log(this.fixtures);
  }
}
