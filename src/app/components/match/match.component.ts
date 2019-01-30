import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { HelpersService } from "../../services/helpers.service";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent {
  @Input() match;
  @Input() logos;
  @Input() leagues;
  @Input() leagueLogos;
  @Input() viewMode;
  @Output() matchSelected = new EventEmitter<any>();
  selected = false;

  constructor() {}

  selectMatch(match) {
    this.selected = !this.selected;
    this.matchSelected.emit({ ...match, selected: this.selected });
  }
}
