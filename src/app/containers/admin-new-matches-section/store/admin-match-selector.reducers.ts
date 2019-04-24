import * as MatchActions from "./admin-match-selector.actions";

const initialState = {
  loadedMatches: [],
  pending: false,
  success: false,
  error: false
};

export function selectMatchesReducer(
  state = initialState,
  action: MatchActions.MatchActions
) {
  switch (action.type) {
    case MatchActions.ADD_MATCHES:
      return {
        ...state,
        loadedMatches: state.loadedMatches.map(matchDay => {
          if (matchDay.date === action.payload.event_date.split("T")[0]) {
            matchDay.matches.map(match => {
              if (match.fixture_id === action.payload.fixture_id) {
                match.selected = !match.selected;
              }
              return match;
            });
          }
          return matchDay;
        })
        // loadedMatches: [
        //   ...state.loadedMatches,
        //   {
        //     date: action.payload.event_date.split("T")[0],
        //     matches: [action.payload]
        //   }
        // ]
      };
    case MatchActions.LOAD_MATCHES:
      return {
        ...state,
        pending: true,
        error: false,
        success: false
      };
    case MatchActions.LOAD_MATCHES_SUCCESS:
      return {
        ...state,
        loadedMatches: action.payload.isCached
          ? [...state.loadedMatches]
          : [...state.loadedMatches, action.payload],
        pending: false,
        error: false,
        success: true
      };
    case MatchActions.LOAD_MATCHES_FAILURE:
      return {
        ...state,
        pending: false,
        error: true,
        success: false
      };
    case MatchActions.RESET_SELECTIONS:
      return {
        ...state,
        loadedMatches: state.loadedMatches.map(matchDay => {
          return {
            date: matchDay.date,
            matches: matchDay.matches.map(match => {
              match.selected = false;
              return match;
            })
          };
        })
      };
    default:
      return state;
  }
}
