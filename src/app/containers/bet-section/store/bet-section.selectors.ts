import { createSelector } from "@ngrx/store";

export const getBetMatchesReducer = state => state.betMatches.betMatches;
export const getBetAndLatestBetReducer = state => state.betMatches;

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

export const getSelectedBetsStatus = createSelector(
  getBetMatchesReducer,
  state => {
    return state.matches
      .map(match => {
        return (
          (match.homeTeamBetScore === "n/a" ||
            !isNaN(match.homeTeamBetScore)) &&
          (match.awayTeamBetScore === "n/a" || !isNaN(match.awayTeamBetScore))
        );
      })
      .includes(false);
  }
);

export const getSelectedBetMatches = createSelector(
  getBetMatchesReducer,
  state => {
    const betMatches = state.matches
      ? state.matches
          .map(match => {
            return {
              [match["fixture_id"]]: {
                homeTeamBetScore: match.homeTeamBetScore,
                awayTeamBetScore: match.awayTeamBetScore
              }
            };
          })
          .reduce((acc, cur) => {
            return { ...acc, ...cur };
          }, {})
      : undefined;
    return { ...betMatches };
  }
);

export const getBetMatches = createSelector(
  getBetMatchesReducer,
  state => state
);

export const getCurrentRound = createSelector(
  getBetMatchesReducer,
  state => state.currentRound
);

export const getMergedMatches = createSelector(
  getBetAndLatestBetReducer,
  state => {
    if (
      state.betMatches.matches &&
      state.latestBet &&
      state.latestBet["matches"]
    ) {
      state.betMatches.matches.map(match => {
        match.homeTeamBetScore =
          state.latestBet.matches[match.fixture_id].homeTeamBetScore;
        match.awayTeamBetScore =
          state.latestBet.matches[match.fixture_id].awayTeamBetScore;
        return match;
      });
    }
    return {
      ...state.betMatches,
      matches: state.betMatches.matches.filter(
        match =>
          !(
            match.goalsHomeTeam &&
            match.homeTeamBetScore === "n/a" &&
            match.goalsAwayTeam &&
            match.awayTeamBetScore === "n/a"
          )
      )
    };
  }
);

export const getResults = createSelector(
  getBetMatchesReducer,
  state => {
    const output = state.matches.map(data => {
      const { homeTeamBetScore, awayTeamBetScore, ...cleanData } = data;
      return cleanData;
    });
    return {
      currentRoundId: state.currentRoundId,
      currentRound: state.currentRound,
      matches: output.reduce((acc, cur) => {
        return { ...acc, [cur["matchKey"]]: cur };
      }, {})
    };
  }
);

export const getRoundForTable = createSelector(
  getBetAndLatestBetReducer,
  state => state.latestRound
);
