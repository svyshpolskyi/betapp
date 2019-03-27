import { Component, Input, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import * as BetMatchActions from "../../containers/bet-section/store/bet-section.actions";
import * as SetScoreActions from "../../containers/admin-set-score-section/store/admin-set-score-section.actions";

@Component({
  selector: "app-team",
  templateUrl: "./team.component.html",
  styleUrls: ["./team.component.scss"]
})
export class TeamComponent implements OnInit {
  private _score;
  get score() {
    return this._score;
  }
  @Input() teamName;
  @Input() teamLogo;
  @Input() viewMode;
  @Input() fixture_id;
  @Input() playingSide;
  @Input() isLatestBet;
  @Input() submitMode;
  @Input()
  set score(val) {
    this._score = val || "?";
  }
  displaySelections = false;
  constructor(private store: Store<{}>) {}

  ngOnInit() {}

  setScore() {
    this.displaySelections = !this.displaySelections;
  }

  onResultSelected(score) {
    if (score) {
      this.score = score;
    } else {
      this.score = "?";
      this.displaySelections = !this.displaySelections;
    }
    if (this.submitMode !== "setScore") {
      this.store.dispatch(
        new BetMatchActions.SetScore({
          playingSide: this.playingSide,
          fixture_id: this.fixture_id,
          score
        })
      );
    } else {
      this.store.dispatch(
        new BetMatchActions.SetResult({
          playingSide: this.playingSide,
          fixture_id: this.fixture_id,
          score
        })
      );
    }
  }

  close() {
    this.displaySelections = false;
  }
}
