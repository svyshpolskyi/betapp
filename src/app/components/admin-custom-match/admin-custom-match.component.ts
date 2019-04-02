import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-custom-match",
  templateUrl: "./admin-custom-match.component.html",
  styleUrls: ["./admin-custom-match.component.scss"]
})
export class AdminCustomMatchComponent implements OnInit {
  match: Object = {};
  constructor() {}

  ngOnInit() {}

  addMatch(value) {
    console.log(value);
  }
}
