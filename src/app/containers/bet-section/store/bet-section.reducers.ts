import * as BetMatchActions from "./bet-section.actions";
import { RESET_SELECTIONS } from "./bet-section.actions";

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
        betMatches: action.payload
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
          matches: state.betMatches["matches"].map(match => ({
            ...match,
            homeTeamBetScore: null,
            awayTeamBetScore: null
          }))
        }
      };
    default:
      return state;
  }
}
