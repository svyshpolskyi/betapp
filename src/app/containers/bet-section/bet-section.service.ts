import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";
import { map } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable()
export class BetSectionService {
  constructor(
    private fetchService: FetchService,
    private af: AngularFireDatabase
  ) {}

  getMatches() {
    return this.af
      .object("/data")
      .valueChanges()
      .pipe(
        map((matchDetails: any) => {
          return {
            ...matchDetails,
            matches: Object.values(matchDetails.tournament)[
              Object.values(matchDetails.tournament).length - 1
            ]["matches"],
            currentRound: Object.values(matchDetails.tournament)[
              Object.values(matchDetails.tournament).length - 1
            ]["tournament_round"]
          };
        })
      );
  }
}
