import { Firefighter } from './../../shared/firefighter.model';
import { Action } from '@ngrx/store';

export const ADD_FIREFIGHTER = 'ADD_FIREFIGHTER';
export const SET_FIREFIGHTERS = 'SET_FIREFIGHTERS';
export const UPDATE_FIREFIGHTER = 'UPDATE_FIREFIGHTER';
export const DELETE_FIREFIGHTER = 'DELETE_FIREFIGHTER';
export const STORE_FIREFIGHTERS = 'STORE_FIREFIGHTERS';
export const FETCH_FIREFIGHTERS = 'FETCH_FIREFIGHTERS';

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

  constructor(public payload: { index: number, firefighter: Firefighter}) {}
}

export class DeleteFirefighter implements Action {
  readonly type = DELETE_FIREFIGHTER;

  constructor(public payload: number) {}
}

export class StoreFirefighters implements Action {
  readonly type = STORE_FIREFIGHTERS;
}

export class FetchFirefighters implements Action {
  readonly type = FETCH_FIREFIGHTERS;
}


export type FirefighterActions =
AddFirefighter |
SetFirefighters |
UpdateFirefighter |
DeleteFirefighter |
StoreFirefighters |
FetchFirefighters;
