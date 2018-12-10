import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {
  team1Logo = "https://www.api-football.com/public/teams/33.png";
  team2Logo = "https://www.api-football.com/public/teams/42.svg";
  leagueLogo = "https://www.api-football.com/public/leagues/2.png";
  constructor() {}

  ngOnInit() {}
}
