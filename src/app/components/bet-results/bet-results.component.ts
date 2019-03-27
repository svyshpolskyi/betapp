import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-bet-results",
  templateUrl: "./bet-results.component.html",
  styleUrls: ["./bet-results.component.scss"]
})
export class BetResultsComponent implements OnInit {
  @Input() match;
  constructor() {}

  ngOnInit() {}
}
