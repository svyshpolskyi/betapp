import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";
import { AngularFirestore } from "@angular/fire/firestore";
import { combineLatest } from "rxjs";
import { filter, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AdminUsersStatusService {
  constructor(
    private fetchService: FetchService,
    private afs: AngularFirestore
  ) {}

  getUsersStatus() {
    return combineLatest(
      this.fetchService.getFBData("table"),
      this.fetchService.getFBDataAsObj("bets"),
      this.fetchService.getFBData("data/tournament")
    ).pipe(
      filter(resp => resp[0].length > 0),
      map(data => {
        return data[0].map(user => {
          return {
            name: [user["displayName"]],
            isBetSubmitted: !!data[1][user["userId"]][data[2].length]
          };
        });
      })
    );
  }
}
