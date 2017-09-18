import { Firefighter } from './../../shared/firefighter.model';
import { Action } from '@ngrx/store';

export const ADD_FIREFIGHTER = 'ADD_FIREFIGHTER';
export const SET_FIREFIGHTERS = 'SET_FIREFIGHTERS';

export class AddFirefighter implements Action {
  readonly type = ADD_FIREFIGHTER;

  constructor(public payload: Firefighter) {}
}

export class SetFirefighters implements Action {
  readonly type = SET_FIREFIGHTERS;

  constructor(public payload: Firefighter[]) {}
}

export type FirefighterActions = AddFirefighter | SetFirefighters;
