import { Injectable } from "@angular/core";
import { combineLatest } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable()
export class HelpersService {
  constructor() {}

  calculatePoints(
    homeTeamScore,
    awayTeamScore,
    homeTeamBet,
    awayTeamBet
  ): number {
    if (homeTeamScore === homeTeamBet && awayTeamScore === awayTeamBet) {
      return 5;
    } else if (
      (+homeTeamScore - awayTeamScore > 0 && +homeTeamBet - awayTeamBet > 0) ||
      (+homeTeamScore - awayTeamScore === 0 &&
        +homeTeamBet - awayTeamBet === 0) ||
      (+homeTeamScore - awayTeamScore < 0 && +homeTeamBet - awayTeamBet < 0)
    ) {
      return 3;
    } else if (homeTeamScore === homeTeamBet || awayTeamScore === awayTeamBet) {
      return 1;
    } else {
      return 0;
    }
  }
}
