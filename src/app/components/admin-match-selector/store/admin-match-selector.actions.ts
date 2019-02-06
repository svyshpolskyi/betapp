import { Action } from "@ngrx/store";

export const ADD_MATCHES = "ADD_MATCHES";

export class AddMatches implements Action {
  readonly type = ADD_MATCHES;
  constructor(public payload) {}
}

export type MatchActions = AddMatches;
