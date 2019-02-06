import { Action } from "@ngrx/store";
import * as MatchActions from "./admin-match-selector.actions";

const initialState = {
  selectedMatches: []
};

export function matchesReducer(
  state = initialState,
  action: MatchActions.MatchActions
) {
  switch (action.type) {
    case MatchActions.ADD_MATCHES:
      return {
        ...state,
        selectedMatches: action.payload
      };
    default:
      return state;
  }
}
