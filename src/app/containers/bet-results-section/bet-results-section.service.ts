import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import {
  getCurrentRound,
  getMergedMatches
} from "../bet-section/store/bet-section.selectors";
import { filter, map, switchMap, tap } from "rxjs/operators";
import { HelpersService } from "../../services/helpers.service";
import { combineLatest, of } from "rxjs";
import { FetchService } from "../../services/fetch.service";
import { getUserId } from "../../store/app.selectors";

@Injectable()
export class BetResultsSectionService {
  constructor(
    private store: Store<{}>,
    private helpersService: HelpersService,
    private fetchService: FetchService
  ) {}

  // getBetResults() {
  //   return this.store.select(getMergedMatches).pipe(
  //     map(res => {
  //       return {
  //         currentRound: res.currentRound,
  //         matches: res.matches
  //           ? res.matches.map(match => {
  //               return {
  //                 points: this.helpersService.calculatePoints(
  //                   match.goalsHomeTeam,
  //                   match.goalsAwayTeam,
  //                   match.homeTeamBetScore,
  //                   match.awayTeamBetScore
  //                 ),
  //                 ...match
  //               };
  //             })
  //           : null
  //       };
  //     })
  //   );
  // }

  // getRoundData() {
  //   return this.store.select(getUserId).pipe(
  //     switchMap(userId =>
  //       this.fetchService.getFBData("data/tournament").pipe(
  //         map(matches => ({
  //           userId,
  //           round: matches[matches.length - 2]["tournament_round"],
  //           matches: matches[matches.length - 2]["matches"]
  //         }))
  //       )
  //     ),
  //     switchMap(resp =>
  //       this.fetchService
  //         .getFBDataAsObj(`bets/${resp.userId}/${resp.round}`)
  //         .pipe(map(bets => ({ ...resp, bets })))
  //     ),
  //     map(data => {
  //       return data.matches.map(match => {
  //         match.homeTeamBetScore =
  //           data.bets["matches"][match.fixture_id].homeTeamBetScore;
  //         match.awayTeamBetScore =
  //           data.bets["matches"][match.fixture_id].awayTeamBetScore;
  //         return match;
  //       });
  //     }),
  //     map(data => {
  //       return data.map(match => {
  //         match.points = this.helpersService.calculatePoints(
  //           match.goalsHomeTeam,
  //           match.goalsAwayTeam,
  //           match.homeTeamBetScore,
  //           match.awayTeamBetScore
  //         );
  //         return match;
  //       });
  //     })
  //   );
  // }

  getRoundData() {
    return this.store.select(getUserId).pipe(
      switchMap(userId => {
        return this.store.select(getCurrentRound).pipe(
          map(round => {
            return { userId, round };
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
          // tap(console.log),
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
            match.homeTeamBetScore =
              data.bets["matches"][match.fixture_id].homeTeamBetScore;
            match.awayTeamBetScore =
              data.bets["matches"][match.fixture_id].awayTeamBetScore;
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
}