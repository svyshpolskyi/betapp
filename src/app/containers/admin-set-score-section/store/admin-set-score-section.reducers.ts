import * as SetScoreActions from "./admin-set-score-section.actions";

const initialState = {
  pending: false,
  success: false,
  error: false
};

export function resultsReducer(
  state = initialState,
  action: SetScoreActions.SetScoreActions
) {
  switch (action.type) {
    case SetScoreActions.SET_ROUND_RESULT:
      return {
        ...state,
        pending: true,
        error: false,
        success: false
      };
    case SetScoreActions.SET_ROUND_RESULT_SUCCESS:
      return {
        ...state,
        pending: false,
        error: false,
        success: true
      };
    case SetScoreActions.SET_ROUND_RESULT_FAILURE:
      return {
        ...state,
        pending: false,
        error: true,
        success: false
      };
    case SetScoreActions.RESET_ROUND_RESULT:
      return {
        ...state,
        pending: false,
        error: false,
        success: false
      };
    default:
      return state;
  }
}
