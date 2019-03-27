import { Action } from "@ngrx/store";

export const SET_RESULT = "SET_RESULT";

export class SetResult implements Action {
  readonly type = SET_RESULT;
  constructor(public payload) {}
}

export type SetScoreActions = SetResult;
