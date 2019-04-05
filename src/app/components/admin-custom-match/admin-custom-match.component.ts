import { Component, OnInit } from "@angular/core";
import { FetchService } from "../../services/fetch.service";
import { AdminCustomMatchService } from "./admin-custom-match.service";
import {
  debounceTime,
  filter,
  map,
  pairwise,
  switchMap,
  tap
} from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { of } from "rxjs";
import { Store } from "@ngrx/store";
import * as MatchActions from "../../containers/admin-new-matches-section/store/admin-match-selector.actions";

@Component({
  selector: "app-admin-custom-match",
  templateUrl: "./admin-custom-match.component.html",
  styleUrls: ["./admin-custom-match.component.scss"]
})
export class AdminCustomMatchComponent implements OnInit {
  form: FormGroup;
  match: Object = {};
  filteredHomeTeams$;
  filteredAwayTeams$;
  matchDate$;
  autoCompleteArray;
  constructor(
    private fetchService: FetchService,
    private adminCustomMatchService: AdminCustomMatchService,
    private fb: FormBuilder,
    private store: Store<{}>
  ) {}
  lastRoundId;
  ngOnInit() {
    this.adminCustomMatchService.getLastRoundMatchesKey().subscribe(key => {
      this.lastRoundId = key;
    });
    this.form = this.fb.group({
      homeTeam: [null, Validators.required],
      homeTeamLogo: [null, Validators.required],
      awayTeam: [null, Validators.required],
      awayTeamLogo: [null, Validators.required],
      matchDate: [null, Validators.required],
      matchTime: [null, Validators.required],
      leagueCountry: [null, Validators.required],
      round: [null, Validators.required]
    });
    this.filteredHomeTeams$ = this.adminCustomMatchService
      .filterTeam(this.form, "homeTeam")
      .pipe(
        tap(res => {
          this.autoCompleteArray = res;
        })
      );
    this.filteredAwayTeams$ = this.adminCustomMatchService
      .filterTeam(this.form, "awayTeam")
      .pipe(
        tap(res => {
          this.autoCompleteArray = res;
        })
      );
    // this.matchDate$ = this.form
    //   .get(["matchDate", "matchTime"])
    //   .valueChanges.subscribe(console.log);
    // this.fetchService
    //   .getApiData("https://api-football-v1.p.mashape.com/leagues")
    //   .subscribe(console.log);
  }

  addMatch() {
    // return this.fetchService.updateFBData(
    //   `data/tournament/${this.lastRoundId}/matches/`,
    //   "8",
    //   {
    //     ...data,
    //     matchDate: `${data.matchDate}`
    //   }
    // );
    // this.fetchService
    //   .getApiData("https://api-football-v1.p.mashape.com/teams/league/403")
    //   .subscribe(data => {
    //     this.fetchService.updateFBData1("data", "teamLogos", data["api"].teams);
    //   });
    this.store.dispatch(
      new MatchActions.AddMatches({
        homeTeam: this.form.value.homeTeam,
        awayTeam: this.form.value.awayTeam,
        event_date: `${this.adminCustomMatchService.tranformDate(
          this.form.value.matchDate
        )}T${this.form.value.matchTime}`,
        fixture_id: `${this.form.value.matchDate.getDate()}${Math.round(
          Math.random() * 1000
        )}`,
        selected: true
      })
    );
    // this.fetchService.pushFBData("test", {
    //   ...this.form.value,
    //   event_date: `${this.adminCustomMatchService.tranformDate(
    //     this.form.value.matchDate
    //   )}T${this.form.value.matchTime}`
    // });
  }

  updateLogos(data, playingSide) {
    this.form.patchValue({
      [`${playingSide}Logo`]: this.autoCompleteArray.filter(
        team => team.name === data.option.value
      )[0]["logo"]
    });
  }
}
