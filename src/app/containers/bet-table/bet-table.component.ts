import { Component, OnInit } from "@angular/core";
import { BetTableService } from "./bet-table.service";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { getRoundForTable } from "../bet-section/store/bet-section.selectors";
import { FetchService } from "../../services/fetch.service";

@Component({
  selector: "app-bet-table",
  templateUrl: "./bet-table.component.html",
  styleUrls: ["./bet-table.component.scss"]
})
export class BetTableComponent implements OnInit {
  table$;
  round$;
  isLoggedIn$;
  constructor(
    private betTableService: BetTableService,
    private store: Store<{}>,
    private fetchService: FetchService
  ) {}

  ngOnInit() {
    this.table$ = this.betTableService.getTableData();
    this.round$ = this.store.select(getRoundForTable);
    this.isLoggedIn$ = this.fetchService.getUserId();
  }
}
