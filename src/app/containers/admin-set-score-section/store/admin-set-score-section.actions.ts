import { Action } from "@ngrx/store";

export const SET_ROUND_RESULT = "SET_ROUND_RESULT";
export const SET_ROUND_RESULT_SUCCESS = "SET_ROUND_RESULT_SUCCESS";
export const SET_ROUND_RESULT_FAILURE = "SET_ROUND_RESULT_FAILURE";
export const RESET_ROUND_RESULT = "RESET_ROUND_RESULT";

export class SetRoundResult implements Action {
  readonly type = SET_ROUND_RESULT;
}

export class SetRoundResultSuccess implements Action {
  readonly type = SET_ROUND_RESULT_SUCCESS;
}

export class SetRoundResultFailure implements Action {
  readonly type = SET_ROUND_RESULT_FAILURE;
}

export class ResetRoundResult implements Action {
  readonly type = RESET_ROUND_RESULT;
}

export type SetScoreActions =
  | SetRoundResult
  | SetRoundResultSuccess
  | SetRoundResultFailure
  | ResetRoundResult;
