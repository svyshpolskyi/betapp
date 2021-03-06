import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { HelpersService } from "../../services/helpers.service";
import { getSelectedBetStatus } from "../../containers/bet-section/store/bet-section.selectors";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-match",
  templateUrl: "./match.component.html",
  styleUrls: ["./match.component.scss"]
})
export class MatchComponent implements OnInit {
  isBetSubmitted;
  @Input() match;
  @Input() logos;
  @Input() leagues;
  @Input() leagueLogos;
  @Input() viewMode;
  @Input() isLatestBet;
  @Input() mode;
  @Output() matchSelected = new EventEmitter<any>();
  // selected = false;

  constructor(private store: Store<{}>) {}

  ngOnInit() {
    if (this.viewMode === "loggedUser" || this.viewMode === "notLoggedUser") {
      this.store
        .select(getSelectedBetStatus, {
          fixture_id: this.match.fixture_id
        })
        .subscribe(data => {
          return (this.isBetSubmitted = data);
        });
    }
  }

  selectMatch(match) {
    // this.selected = !this.selected;
    this.matchSelected.emit({ ...match });
  }
}
