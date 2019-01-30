import { Component, OnInit } from "@angular/core";
import { BetSectionService } from "./bet-section.service";
import { AngularFireList } from "@angular/fire/database";

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
    // .subscribe(data => console.log(data));
  }
}
