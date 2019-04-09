import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { BetResultsSectionService } from "./bet-results-section.service";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { FetchService } from "../../services/fetch.service";
import { BetSectionService } from "../bet-section/bet-section.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { getUserId } from "../../store/app.selectors";

@Component({
  selector: "app-bet-results-section",
  templateUrl: "./bet-results-section.component.html",
  styleUrls: ["./bet-results-section.component.scss"]
})
export class BetResultsSectionComponent implements OnInit {
  betResults$;
  isLoggedIn$;
  allUsers$;
  allUsers;
  selectedUser = {};
  currentRound;
  totalPoints;
  selectedUserSubject$;
  isAnyResultExist;
  constructor(
    private betResultsSectionService: BetResultsSectionService,
    private fetchService: FetchService,
    private betSectionService: BetSectionService,
    private store: Store<{}>
  ) {}

  ngOnInit() {
    this.selectedUserSubject$ = new BehaviorSubject<{}>(this.selectedUser);
    this.allUsers$ = this.betResultsSectionService.getAllUsers().pipe(
      tap(res => {
        console.log("is");
        this.allUsers = res.users;
        this.selectedUserSubject$.next(res);
      })
    );
    this.betResults$ = this.selectedUserSubject$.asObservable().pipe(
      filter(resp => resp["selectedUser"]),
      switchMap(user => {
        return this.betResultsSectionService
          .getRoundData(user["selectedUser"]["userId"])
          .pipe(
            tap(data => {
              this.totalPoints = data.matches.reduce((acc, cur) => {
                return (acc += cur.points);
              }, 0);
            })
          );
      }),
      tap(data => {
        this.isAnyResultExist = data["matches"].find(
          match => match.goalsHomeTeam && match.goalsAwayTeam
        );
      })
    );
    this.isLoggedIn$ = this.fetchService.getUserId();
  }

  selectChanged(event) {
    this.selectedUserSubject$.next({
      selectedUser: this.allUsers.find(user => user.displayName === event.value)
    });
  }
}
