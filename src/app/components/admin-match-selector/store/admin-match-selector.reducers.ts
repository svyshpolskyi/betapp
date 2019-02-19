import * as MatchActions from "./admin-match-selector.actions";

const initialState = {
  selectedMatches: [],
  loadedMatches: [],
  pending: false,
  success: false,
  error: false
};

export function matchesReducer(
  state = initialState,
  action: MatchActions.MatchActions
) {
  switch (action.type) {
    case MatchActions.ADD_MATCHES:
      return {
        ...state,
        selectedMatches: action.payload.selected
          ? [...state.selectedMatches, action.payload]
          : state.selectedMatches.filter(
              match => match.fixture_id !== action.payload.fixture_id
            )
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
    default:
      return state;
  }
}
