import { Shifts } from './../../shared/shifts.model';
import { Action } from '@ngrx/store';

export const UPDATE_BUILDER = 'UPDATE_BUILDER';
export const UPDATE_N2 = 'UPDATE_N2';
export const ROSTERS_ERROR = 'ROSTERS_ERROR';
export const FETCH_SHIFTS = 'FETCH_SHIFTS';
export const SET_SHIFTS = 'SET_SHIFTS';

export class UpdateBuilder implements Action {
  readonly type = UPDATE_BUILDER;

  constructor(public payload: {pump: number, position: string, firefighter: string}) {}
}

export class UpdateN2 implements Action {
  readonly type = UPDATE_N2;

  constructor(public payload: {firefighter: string, type: string, date: Date}) {}
}

export class RostersError implements Action {
  readonly type = ROSTERS_ERROR;

  constructor(public payload?: any) {}
}

export class FetchShifts implements Action {
  readonly type = FETCH_SHIFTS;
}

export class SetShifts implements Action {
  readonly type = SET_SHIFTS;

  constructor(public payload: Shifts[]) {}
}


export type RostersActions =
UpdateBuilder |
UpdateN2 |
RostersError|
FetchShifts|
SetShifts;
