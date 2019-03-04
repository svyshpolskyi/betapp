import * as AppActions from "./app.actions";

const initialState = {
  submittedMatches: {
    success: false,
    pending: false,
    failed: false
  },
  user: {}
};

export function appReducer(
  state = initialState,
  action: AppActions.AppActions
) {
  switch (action.type) {
    case AppActions.SUBMIT_MATCHES_START:
      return {
        ...state,
        submittedMatches: { ...state.submittedMatches, pending: true }
      };
    case AppActions.SUBMIT_MATCHES_SUCCESS:
      return {
        ...state,
        submittedMatches: {
          ...state.submittedMatches,
          pending: false,
          success: true
        }
      };
    case AppActions.SUBMIT_MATCHES_RESET:
      return {
        ...state,
        submittedMatches: {
          ...state.submittedMatches,
          pending: false,
          success: false
        }
      };

    case AppActions.SET_USER:
      return {
        ...state,
        user: {
          displayName: action.payload ? action.payload.displayName : null,
          userID: action.payload ? action.payload.uid : null
        }
      };

    case AppActions.RESET_USER:
      return {
        ...state,
        user: {}
      };
    default:
      return state;
  }
}
