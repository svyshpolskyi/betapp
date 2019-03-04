import { Action } from "@ngrx/store";

export const SUBMIT_MATCHES_START = "SUBMIT_MATCHES_START";
export const SUBMIT_MATCHES_SUCCESS = "SUBMIT_MATCHES_START_SUCCESS";
export const SUBMIT_MATCHES_RESET = "SUBMIT_MATCHES_RESET";
export const SET_USER = "SET_USER";
export const RESET_USER = "RESET_USER";

export class SubmitMatchesStart implements Action {
  readonly type = SUBMIT_MATCHES_START;
}

export class SubmitMatchesSuccess implements Action {
  readonly type = SUBMIT_MATCHES_SUCCESS;
}

export class SubmitMatchesReset implements Action {
  readonly type = SUBMIT_MATCHES_RESET;
}
export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload) {}
}

export class ResetUser implements Action {
  readonly type = RESET_USER;
}

export type AppActions =
  | SubmitMatchesStart
  | SubmitMatchesSuccess
  | SubmitMatchesReset
  | SetUser
  | ResetUser;
