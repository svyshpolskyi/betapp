import { createSelector } from "@ngrx/store";

export const getLoadedMatchesReducer = state =>
  state.selectMatches.loadedMatches;
export const getLoadingStatusReducer = state => state.selectMatches.pending;
export const getFailedStatusReducer = state => state.selectMatches.error;
export const getSuccessStatusReducer = state => state.selectMatches.success;
export const getSelectedMatchesReducer = state =>
  state.selectMatches.loadedMatches;

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

export const getSuccessStatus = createSelector(
  getFailedStatusReducer,
  state => state
);

export const getSelectedMatches = createSelector(
  getSelectedMatchesReducer,
  state => {
    return state
      .map(matchDay => {
        return matchDay.matches.filter(match => match.selected);
      })
      .flat();
  }
);
