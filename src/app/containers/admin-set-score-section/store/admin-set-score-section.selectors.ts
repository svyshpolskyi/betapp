import { createSelector } from "@ngrx/store";

export const getRoundMatches = state => state.betMatches.betMatches;

export const getMatchesToSetScore = createSelector(
  getRoundMatches,
  state => {
    return state;
  }
);
