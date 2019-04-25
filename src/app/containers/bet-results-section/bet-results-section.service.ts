import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  getCurrentRound,
  getMergedMatches
} from "../bet-section/store/bet-section.selectors";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { HelpersService } from "../../services/helpers.service";
import { combineLatest, Observable, of } from "rxjs";
import { FetchService } from "../../services/fetch.service";
import { AngularFirestore } from "@angular/fire/firestore";

import { getUserId } from "../../store/app.selectors";
interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  favoriteColor?: string;
}
@Injectable()
export class BetResultsSectionService {
  constructor(
    private store: Store<{}>,
    private helpersService: HelpersService,
    private fetchService: FetchService,
    private afs: AngularFirestore
  ) {}

  getRoundData(userId) {
    return of(userId).pipe(
      switchMap(id => {
        return this.store.select(getCurrentRound).pipe(
          map(round => {
            return { userId: id, round };
          })
        );
      }),
      filter(resp => resp.round),
      switchMap(resp =>
        this.fetchService.getFBDataAsObj(`bets/${resp.userId}`).pipe(
          map(bets => ({
            ...resp,
            bets: bets[resp.round] ? bets[resp.round] : bets[resp.round - 1],
            round: bets[resp.round] ? resp.round : resp.round - 1
          }))
        )
      ),
      switchMap(res => {
        return this.fetchService.getFBData("data/tournament").pipe(
          map(matches => {
            return {
              userId: res.userId,
              round: res.round,
              matches: matches[res.round - 1]["matches"],
              bets: res.bets
            };
          })
        );
      }),
      map(data => {
        return {
          currentRound: data.round,
          matches: data.matches.map(match => {
            match.homeTeamBetScore = data.bets["matches"]
              ? data.bets["matches"][match.fixture_id].homeTeamBetScore
              : "n/a";
            match.awayTeamBetScore = data.bets["matches"]
              ? data.bets["matches"][match.fixture_id].awayTeamBetScore
              : "n/a";
            match.points = this.helpersService.calculatePoints(
              match.goalsHomeTeam,
              match.goalsAwayTeam,
              match.homeTeamBetScore,
              match.awayTeamBetScore
            );
            return match;
          })
        };
      })
    );
  }

  getAllUsers() {
    return combineLatest(
      this.fetchService.getFBData("table"),
      this.store.select(getUserId)
    ).pipe(
      map(data => ({
        users: data[0],
        selectedUser: data[0].find(user => user["userId"] === data[1])
      }))
    );
    // return this.store.select(getUserId);
    // return this.fetchService.getFBData("table");
  }
}
