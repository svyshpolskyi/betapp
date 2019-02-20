import { Action } from "@ngrx/store";

export const LOAD_BET_MATCHES = "LOAD_BET_MATCHES";
export const SET_SCORE = "SET_SCORE";

export class LoadBetMatches implements Action {
  readonly type = LOAD_BET_MATCHES;
  constructor(public payload) {}
}

export class SetScore implements Action {
  readonly type = SET_SCORE;
  constructor(public payload) {}
}

export type BetMatchActions = LoadBetMatches | SetScore;
