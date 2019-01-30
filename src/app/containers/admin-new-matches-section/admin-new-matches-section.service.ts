import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";
import { AngularFireDatabase } from "@angular/fire/database";

import { urls } from "../../constants/endpoints";

@Injectable()
export class AdminNewMatchesSectionService {
  constructor(
    private fetchService: FetchService,
    private af: AngularFireDatabase
  ) {}

  getFixtures(date) {
    return this.fetchService.makeRequest(`${urls.fixtures}/${date}`);
  }

  getRoundsQuantity() {
    return this.fetchService.getFBData("/data/tournament");
  }
}
