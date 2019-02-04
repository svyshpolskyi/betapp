import { Component, OnInit } from "@angular/core";
import { BetSectionService } from "./bet-section.service";
import { AngularFireList } from "@angular/fire/database";
import { tap } from "rxjs/operators";
import { pipe } from "rxjs";

@Component({
  selector: "app-bet-section",
  templateUrl: "./bet-section.component.html"
})
export class BetSectionComponent implements OnInit {
  viewMode = "user";
  matchDetails$;
  constructor(private betSectionService: BetSectionService) {}

  ngOnInit() {
    this.matchDetails$ = this.betSectionService.getMatches();
    // .pipe(tap(data => console.log(data)));
  }
}
