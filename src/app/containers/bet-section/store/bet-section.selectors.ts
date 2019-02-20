import { createSelector } from "@ngrx/store";

export const getSelectedBetStatusReducer = state => state.betMatches.betMatches;

export const getSelectedBetStatus = createSelector(
  getSelectedBetStatusReducer,
  (state, fixture_id) => {
    const betMatch = state.find(
      match => match.fixture_id === fixture_id.fixture_id
    );
    return !!betMatch.homeTeamBetScore && !!betMatch.awayTeamBetScore;
  }
);
