import * as MatchActions from "./admin-set-score-section.actions";
import * as SetScoreActions from "./admin-set-score-section.actions";

const initialState = {
  betMatches: {}
};

export function setScoresReducer(
  state = initialState,
  action: SetScoreActions.SetScoreActions
) {
  switch (action.type) {
    case SetScoreActions.SET_RESULT:
      console.log("test");
      return {
        ...state,
        betMatches: {
          ...state.betMatches,
          matches: state.betMatches["matches"].map(match => {
            console.log(match);
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
  }
}
