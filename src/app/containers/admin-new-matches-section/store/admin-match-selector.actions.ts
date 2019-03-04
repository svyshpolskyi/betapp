import { Action } from "@ngrx/store";

export const ADD_MATCHES = "ADD_MATCHES";
export const LOAD_MATCHES = "LOAD_MATCHES";
export const LOAD_MATCHES_SUCCESS = "LOAD_MATCHES_SUCCESS";
export const LOAD_MATCHES_FAILURE = "LOAD_MATCHES_FAILURE";
export const RESET_SELECTIONS = "RESET_SELECTIONS";

export class AddMatches implements Action {
  readonly type = ADD_MATCHES;
  constructor(public payload) {}
}

export class LoadMatches implements Action {
  readonly type = LOAD_MATCHES;
}

export class LoadMatchesSuccess implements Action {
  readonly type = LOAD_MATCHES_SUCCESS;
  constructor(public payload) {}
}

export class LoadMatchesFailure implements Action {
  readonly type = LOAD_MATCHES_FAILURE;
}

export class ResetSelections implements Action {
  readonly type = RESET_SELECTIONS;
}

export type MatchActions =
  | AddMatches
  | LoadMatches
  | LoadMatchesSuccess
  | LoadMatchesFailure
  | ResetSelections;
