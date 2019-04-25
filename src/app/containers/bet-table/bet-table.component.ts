import { Component, OnInit } from "@angular/core";
import { BetTableService } from "./bet-table.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { getRoundForTable } from "../bet-section/store/bet-section.selectors";
import { FetchService } from "../../services/fetch.service";
import { switchMap, tap } from "rxjs/operators";

@Component({
  selector: "app-bet-table",
  templateUrl: "./bet-table.component.html",
  styleUrls: ["./bet-table.component.scss"]
})
export class BetTableComponent implements OnInit {
  table$;
  round$;
  isLoggedIn$;
  selectedRound = "all";
  roundsList = [];
  allRoundsOption = "All rounds";
  selectedRoundSubject$;
  constructor(
    private betTableService: BetTableService,
    private store: Store<{}>,
    private fetchService: FetchService
  ) {}

  ngOnInit() {
    this.selectedRoundSubject$ = new BehaviorSubject<string | number>(
      this.selectedRound
    );
    this.table$ = this.selectedRoundSubject$.asObservable().pipe(
      switchMap(round => {
        return this.betTableService.getTableData(round);
      })
    );
    this.round$ = this.store.select(getRoundForTable).pipe(
      tap(round => {
        this.roundsList = Array(round)
          .fill(0)
          .reduce(
            (acc, cur, i, arr) => {
              return [...acc, `Round ${arr.length - i}`];
            },
            [this.allRoundsOption]
          );
      })
    );
    this.isLoggedIn$ = this.fetchService.getUserId();
  }

  selectChanged(event) {
    this.selectedRoundSubject$.next(event.value);
  }

  transformRoundValue(round) {
    return isNaN(round.split(" ")[1]) ? "all" : +round.split(" ")[1];
  }
}
