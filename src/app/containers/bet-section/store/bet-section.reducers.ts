import * as BetMatchActions from "./bet-section.actions";
import * as SetScoreActions from "../../admin-set-score-section/store/admin-set-score-section.actions";

const initialState = {
  betMatches: {}
};

export function betMatchesReducer(
  state = initialState,
  action: BetMatchActions.BetMatchActions
) {
  switch (action.type) {
    case BetMatchActions.LOAD_BET_MATCHES:
      return {
        ...state,
        betMatches: {
          ...action.payload,
          matches: action.payload.matches.map(match => {
            return {
              ...match,
              homeTeamBetScore: match.goalsHomeTeam ? "n/a" : undefined,
              awayTeamBetScore: match.goalsAwayTeam ? "n/a" : undefined
            };
          })
        }
      };
    case BetMatchActions.RESET_BET_MATCHES:
      return {
        ...state,
        betMatches: {}
      };
    case BetMatchActions.SET_SCORE:
      return {
        ...state,
        betMatches: {
          ...state.betMatches,
          matches: state.betMatches["matches"].map(match => {
            if (match.fixture_id === action.payload.fixture_id) {
              if (action.payload.playingSide === "home") {
                match.homeTeamBetScore = action.payload.score;
              } else {
                match.awayTeamBetScore = action.payload.score;
              }
            }
            return match;
          })
        }
      };
    case BetMatchActions.RESET_SELECTIONS:
      return {
        ...state,
        betMatches: {
          ...state.betMatches,
          matches: state.betMatches["matches"]
            ? state.betMatches["matches"].map(match => ({
                ...match,
                homeTeamBetScore: undefined,
                awayTeamBetScore: undefined
              }))
            : []
        }
      };
    case BetMatchActions.LOAD_LATEST_BET:
      return {
        ...state,
        latestBet: action.payload.roundBet,
        latestRound: action.payload.roundBet
          ? action.payload.round
          : action.payload.round - 1
      };
    case BetMatchActions.SET_RESULT:
      return {
        ...state,
        betMatches: {
          ...state.betMatches,
          matches: state.betMatches["matches"].map(match => {
            if (match.fixture_id === action.payload.fixture_id) {
              if (action.payload.playingSide === "home") {
                match.goalsHomeTeam = action.payload.score;
              } else {
                match.goalsAwayTeam = action.payload.score;
              }
            }
            return match;
          })
        }
      };
    default:
      return state;
  }
}
