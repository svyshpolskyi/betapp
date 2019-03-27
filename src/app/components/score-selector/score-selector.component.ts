import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-score-selector",
  templateUrl: "./score-selector.component.html",
  styleUrls: ["./score-selector.component.scss"]
})
export class ScoreSelectorComponent implements OnInit {
  selectorValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  @Output() resultSelected = new EventEmitter<any>();
  @Output() clickedOutside = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {}

  getScoreNumber(el) {
    this.resultSelected.emit(el.target.value);
  }
}
