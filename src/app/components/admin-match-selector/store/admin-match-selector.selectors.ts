import { createSelector } from "@ngrx/store";

export const getLoadedMatchesReducer = state => state.matches.loadedMatches;
export const getLoadingStatusReducer = state => state.matches.pending;
export const getFailedStatusReducer = state => state.matches.error;

export const getLoadedMatches = createSelector(
  getLoadedMatchesReducer,
  (state, date) => {
    return state.find(match => match.date === date.date)
      ? state.find(match => match.date === date.date)
      : { date: date.date };
  }
);

export const getLoadingStatus = createSelector(
  getLoadingStatusReducer,
  state => state
);

export const getFailedStatus = createSelector(
  getFailedStatusReducer,
  state => state
);
