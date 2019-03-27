import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";

import { AngularFireDatabase } from "@angular/fire/database";
import { Store } from "@ngrx/store";
import { getMatchesToSetScore } from "./store/admin-set-score-section.selectors";
import { getResults } from "../bet-section/store/bet-section.selectors";
import { first, take } from "rxjs/operators";

@Injectable()
export class AdminSetScoresSectionService {
  constructor(private fetchService: FetchService, private store: Store<{}>) {}

  submitScoresMethod(roundId, data) {
    return this.fetchService
      .updateFBData(`data/tournament/${roundId}/`, "matches", data)
      .pipe(first());
  }

  getMatchesToSetScore() {
    return this.store.select(getMatchesToSetScore);
  }

  getResultsToSubmit() {
    return this.store.select(getResults).pipe(take(1));
  }
}
