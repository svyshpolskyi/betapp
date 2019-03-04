import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-date-buttons",
  templateUrl: "./date-buttons.component.html",
  styleUrls: ["./date-buttons.component.scss"]
})
export class DateButtonsComponent implements OnInit {
  dates;
  constructor() {}

  ngOnInit() {
    this.dates = this.getDates(7);
  }

  // method for getting the list of future 5 days dates and displaying it on buttons
  getDates(numberOfDays) {
    let currentDate = Date.now();
    return [...new Array(numberOfDays)].fill("").map((el, index, arr) => {
      const date = new Date(currentDate);
      currentDate += 86400000;
      return `${date.getFullYear()}-${
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : date.getMonth() + 1
      }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`;
    });
  }
}
