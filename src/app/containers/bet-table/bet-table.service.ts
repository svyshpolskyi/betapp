import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";
import { map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class BetTableService {
  constructor(private fetchService: FetchService) {}

  getTableData(round) {
    return this.fetchService.getFBData("/table").pipe(
      switchMap(data => {
        if (round === "all") {
          return of(
            data.sort((a, b) => {
              return b["points"] - a["points"];
            })
          );
        } else {
          return this.fetchService.getFBDataAsObj("/bets").pipe(
            map(resp => {
              return data.map(user => {
                user["points"] = resp[user["userId"]][round].points;
                return user;
              });
            }),
            map(dat => {
              return dat.sort((a, b) => {
                return b["points"] - a["points"];
              });
            })
          );
        }
      }),
      map(resp => {
        return resp.map((dat, index) => {
          return { ...dat, place: index + 1 };
        });
      })
    );
  }

  getTableDataByRound(round) {}
}
