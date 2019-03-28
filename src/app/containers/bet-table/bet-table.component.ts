import { Component, OnInit } from "@angular/core";
import { BetTableService } from "./bet-table.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-bet-table",
  templateUrl: "./bet-table.component.html",
  styleUrls: ["./bet-table.component.scss"]
})
export class BetTableComponent implements OnInit {
  table$;
  constructor(private betTableService: BetTableService) {}

  ngOnInit() {
    this.table$ = this.betTableService.getTableData();
  }
}
