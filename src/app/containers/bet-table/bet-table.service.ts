import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";
import { map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BetTableService {
  constructor(private fetchService: FetchService) {}

  getTableData() {
    return this.fetchService.getFBData("/table").pipe(
      map(data => {
        return data.sort((a, b) => {
          return b["points"] - a["points"];
        });
      }),
      map(resp => {
        return resp.map((dat, index) => {
          return { ...dat, place: index + 1 };
        });
      })
    );
  }
}
