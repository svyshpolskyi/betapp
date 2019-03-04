import { createSelector } from "@ngrx/store";

export const getBetMatchesReducer = state => state.betMatches.betMatches;

export const getSelectedBetStatus = createSelector(
  getBetMatchesReducer,
  (state, fixture_id) => {
    const betMatch = state.matches
      ? state.matches.find(match => match.fixture_id === fixture_id.fixture_id)
      : {};
    return betMatch
      ? !!betMatch.homeTeamBetScore && !!betMatch.awayTeamBetScore
      : false;
  }
);

export const getBetMatches = createSelector(
  getBetMatchesReducer,
  state => state
);

export const getCurrentRound = createSelector(
  getBetMatchesReducer,
  state => state.currentRoundfind
);
