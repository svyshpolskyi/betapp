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
            matches:
              matchDetails.tournament[matchDetails.tournament.length - 1]
                .matches
          };
        })
      );
  }
}
