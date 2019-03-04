import { Injectable } from "@angular/core";
import { FetchService } from "../../services/fetch.service";
import { map, tap } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable()
export class BetSectionService {
  constructor(
    private fetchService: FetchService,
    private af: AngularFireDatabase
  ) {}

  getMatches() {
    return this.af
      .object("/data")
      .valueChanges()
      .pipe(
        map((matchDetails: any) => {
          const matches = Object.values(matchDetails.tournament)[
            Object.values(matchDetails.tournament).length - 1
          ]["matches"];
          const currentRound = Object.values(matchDetails.tournament)[
            Object.values(matchDetails.tournament).length - 1
          ]["tournament_round"];
          return {
            matches: matches.map(match => ({
              ...match,
              awayTeamBetScore: undefined,
              homeTeamBetScore: undefined
            })),
            currentRound,
            leagues: matchDetails.leagues,
            teamLogos: matches.reduce((acc, cur) => {
              return {
                ...acc,
                [cur.homeTeam_id]: matchDetails.teamLogos[cur.homeTeam_id],
                [cur.awayTeam_id]: matchDetails.teamLogos[cur.awayTeam_id]
              };
            }, {})
          };
        })
      );
  }

  submitBetMethod(key, round, data) {
    return this.fetchService.updateFBData(`/bets/${key}`, `${round}`, data);
  }
}
