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

  transformResult(result1, result2) {
    if (isNaN(result1) && isNaN(result2)) {
      return "No predicted result";
    } else {
      return `Predicted result ${result1}-${result2}`;
    }
  }
}
