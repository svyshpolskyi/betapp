import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";
import { debounceTime, map, pairwise, switchMap, tap } from "rxjs/operators";
import { DatePipe } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class AdminCustomMatchService {
  constructor(private fetchService: FetchService, private datePipe: DatePipe) {}

  getLastRoundMatchesKey() {
    return this.fetchService
      .getFBLastItem("data/tournament")
      .pipe(map(changes => changes[0].payload.key));
  }

  filterTeam(form, fieldId) {
    return form.get(fieldId).valueChanges.pipe(
      debounceTime(3000),
      switchMap(value => {
        return this.fetchService
          .getFBData("data/teamLogos")
          .pipe(
            map(teams =>
              teams.filter(team => team["name"].toLowerCase().includes(value))
            )
          );
      })
    );
  }

  filterLeague(form, fieldId) {
    return form.get(fieldId).valueChanges.pipe(
      debounceTime(3000),
      switchMap(value => {
        return this.fetchService
          .getFBData("data/leagues")
          .pipe(
            map(leagues =>
              leagues.filter(league =>
                league["league_country"].toLowerCase().includes(value)
              )
            )
          );
      })
    );
  }

  tranformDate(date) {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }
}
