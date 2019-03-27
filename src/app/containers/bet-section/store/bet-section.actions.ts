import { Action } from "@ngrx/store";

export const LOAD_BET_MATCHES = "LOAD_BET_MATCHES";
export const RESET_BET_MATCHES = "RESET_BET_MATCHES";
export const SET_SCORE = "SET_SCORE";
export const RESET_SELECTIONS = "RESET_SELECTIONS";
export const LOAD_LATEST_BET = "LOAD_LATEST_BET";
export const SET_RESULT = "SET_RESULT";

export class LoadBetMatches implements Action {
  readonly type = LOAD_BET_MATCHES;
  constructor(public payload) {}
}

export class SetScore implements Action {
  readonly type = SET_SCORE;
  constructor(public payload) {}
}

export class ResetBetMatches implements Action {
  readonly type = RESET_BET_MATCHES;
}

export class ResetSelections implements Action {
  readonly type = RESET_SELECTIONS;
}

export class LoadLatestBet implements Action {
  readonly type = LOAD_LATEST_BET;
  constructor(public payload) {}
}

export class SetResult implements Action {
  readonly type = SET_RESULT;
  constructor(public payload) {}
}

export type BetMatchActions =
  | LoadBetMatches
  | SetScore
  | ResetBetMatches
  | ResetSelections
  | LoadLatestBet
  | SetResult;
