import { createSelector } from "@ngrx/store";

export const getRoundMatches = state => state.betMatches.betMatches;
export const getSubmissionResults = state => state.results;

export const getMatchesToSetScore = createSelector(
  getRoundMatches,
  state => state
);

export const getSubmissionResultsState = createSelector(
  getSubmissionResults,
  state => state
);
