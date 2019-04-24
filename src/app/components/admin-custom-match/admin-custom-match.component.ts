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
  filteredLeagues$;
  matchDate$;
  autoCompleteArray;
  lastRound$;
  constructor(
    private fetchService: FetchService,
    private adminCustomMatchService: AdminCustomMatchService,
    private fb: FormBuilder,
    private store: Store<{}>
  ) {}
  lastRoundId;
  ngOnInit() {
    this.lastRound$ = this.adminCustomMatchService
      .getLastRoundMatchesKey()
      .subscribe(key => {
        this.lastRoundId = key;
      });
    this.form = this.fb.group({
      homeTeam: [null, Validators.required],
      homeTeam_id: [null, Validators.required],
      homeTeamLogo: [null, Validators.required],
      awayTeam: [null, Validators.required],
      awayTeam_id: [null, Validators.required],
      awayTeamLogo: [null, Validators.required],
      matchDate: [null, Validators.required],
      matchTime: [null, Validators.required],
      leagueCountry: [null, Validators.required],
      leagueLogo: [null, Validators.required],
      league_id: [null, Validators.required],
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
    this.filteredLeagues$ = this.adminCustomMatchService
      .filterLeague(this.form, "leagueCountry")
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

  addMatch(form) {
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
    console.log(this.form.value.homeTeam_id, this.form.value.awayTeam_id);
    this.store.dispatch(
      new MatchActions.LoadMatchesSuccess({
        date: this.form.value.matchDate,
        matches: [
          {
            homeTeam: this.form.value.homeTeam,
            homeTeam_id: this.form.value.homeTeam_id,
            awayTeam: this.form.value.awayTeam,
            awayTeam_id: this.form.value.awayTeam_id,
            event_date: `${this.adminCustomMatchService.tranformDate(
              this.form.value.matchDate
            )}T${this.form.value.matchTime}`,
            fixture_id: `${this.form.value.matchDate.getDate()}${Math.round(
              Math.random() * 1000
            )}`,
            league_id: this.form.value.league_id,
            round: this.form.value.round,
            selected: true
          }
        ]
      })
    );

    this.lastRound$.unsubscribe();
    // this.fetchService.pushFBData("test", {
    //   ...this.form.value,
    //   event_date: `${this.adminCustomMatchService.tranformDate(
    //     this.form.value.matchDate
    //   )}T${this.form.value.matchTime}`
    // });
  }

  updateTeamLogos(data, playingSide) {
    this.form.patchValue({
      [`${playingSide}Logo`]: this.autoCompleteArray.filter(
        team => team.name === data.option.value
      )[0]["logo"],
      [`${playingSide}_id`]: this.autoCompleteArray.filter(
        team => team.name === data.option.value
      )[0]["team_id"]
    });
  }

  updateLeagueLogo(data) {
    console.log(data.option.value);
    this.form.patchValue({
      leagueLogo: this.autoCompleteArray.filter(
        league =>
          `${league.league_country} ${league.league_name}` === data.option.value
      )[0]["league_logo"],
      league_id: this.autoCompleteArray.filter(
        league =>
          `${league.league_country} ${league.league_name}` === data.option.value
      )[0]["league_id"]
    });
  }
}
