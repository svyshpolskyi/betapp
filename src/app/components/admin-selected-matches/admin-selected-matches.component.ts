import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-admin-selected-matches",
  templateUrl: "./admin-selected-matches.component.html",
  styleUrls: ["./admin-selected-matches.component.scss"]
})
export class AdminSelectedMatchesComponent implements OnInit {
  @Input() selectedMatches;
  constructor() {}

  ngOnInit() {}
}
