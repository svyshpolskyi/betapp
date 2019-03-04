import { createSelector } from "@ngrx/store";

export const getSubmittedMatchesStatusReducer = state =>
  state.app.submittedMatches;
export const getUserReducer = state => state.app.user;

export const getSubmittedMatchesSuccessStatus = createSelector(
  getSubmittedMatchesStatusReducer,
  state => state.success
);

export const getUserId = createSelector(
  getUserReducer,
  state => state.userID
);
