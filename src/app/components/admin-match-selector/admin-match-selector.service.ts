import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";

import { urls } from "../../constants/endpoints";
import { leagues } from "../../constants/leagues";
import { map } from "rxjs/operators";

@Injectable()
export class AdminMatchSelectorService {
  supportedLeagueIDs;
  constructor(private fetchService: FetchService) {
    this.supportedLeagueIDs = Object.keys(leagues.api.leagues);
  }

  getFixtures(date) {
    return this.fetchService.makeRequest(`${urls.fixtures}/${date}`).pipe(
      map(fixtures => {
        return this.filterFixtures(fixtures["api"].fixtures);
      })
    );
  }

  filterFixtures(fixtures) {
    return Object.values(fixtures).filter(data =>
      this.supportedLeagueIDs.includes(data["league_id"])
    );
  }
  getRoundsQuantity() {
    return this.fetchService.getFBData("/data/tournament");
  }
}
