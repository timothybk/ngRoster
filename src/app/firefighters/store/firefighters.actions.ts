import { Firefighter } from './../../shared/firefighter.model';
import { Action } from '@ngrx/store';

export const ADD_FIREFIGHTER = 'ADD_FIREFIGHTER';

export class AddFirefighter implements Action {
  readonly type = ADD_FIREFIGHTER;
  payload: Firefighter;
}

export type FirefighterActions = AddFirefighter;
