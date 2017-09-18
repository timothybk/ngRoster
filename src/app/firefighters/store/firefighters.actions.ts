import { Firefighter } from './../../shared/firefighter.model';
import { Action } from '@ngrx/store';

export const ADD_FIREFIGHTER = 'ADD_FIREFIGHTER';
export const SET_FIREFIGHTERS = 'SET_FIREFIGHTERS';
export const UPDATE_FIREFIGHTER = 'UPDATE_FIREFIGHTER';
export const DELETE_FIREFIGHTER = 'DELETE_FIREFIGHTER';

export class AddFirefighter implements Action {
  readonly type = ADD_FIREFIGHTER;

  constructor(public payload: Firefighter) {}
}

export class SetFirefighters implements Action {
  readonly type = SET_FIREFIGHTERS;

  constructor(public payload: Firefighter[]) {}
}

export class UpdateFirefighter implements Action {
  readonly type = UPDATE_FIREFIGHTER;

  constructor(public payload: {index: number, firefighter: Firefighter}) {}
}

export class DeleteFirefighter implements Action {
  readonly type = DELETE_FIREFIGHTER;

  constructor(public payload: number) {}
}

export type FirefighterActions =
AddFirefighter |
SetFirefighters |
UpdateFirefighter |
DeleteFirefighter;
