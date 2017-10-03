import { RosterN2 } from './../roster-n2/roster-n2.model';
import { Firefighter } from './../../shared/firefighter.model';
import { ShiftInstance } from './../shift-instance.model';
import { Pump } from './../pump.model';
import { Action } from '@ngrx/store';


export const SET_SHIFTSINSTS = 'SET_SHIFTSINST';
export const FETCH_SHIFTSINSTS = 'FETCH_SHIFTSINST';
export const ADD_PUMP = 'ADD_PUMP';
export const SET_PUMPS = 'SET_PUMPS';
export const UPDATE_PUMP = 'UPDATE_PUMP';
export const DELETE_PUMP = 'DELETE_PUMP';
export const STORE_PUMPS = 'STORE_PUMPS';
export const FETCH_PUMPS = 'FETCH_PUMPS';
export const STORE_N2S = 'STORE_N2S';
export const FETCH_N2S = 'FETCH_N2S';
export const UPDATE_N2 = 'UPDATE_N2';
export const UPDATE_N2_SUCCESS = 'UPDATE_N2_SUCCESS';
export const ROSTERS_ERROR = 'ROSTERS_ERROR';

export class SetShiftsInsts implements Action {
  readonly type = SET_SHIFTSINSTS;

  constructor(public payload: ShiftInstance[]) {}
}

export class FetchShiftsInsts implements Action {
  readonly type = FETCH_SHIFTSINSTS;
}

export class AddPump implements Action {
  readonly type = ADD_PUMP;

  constructor(public payload: Pump) {}
}

export class SetPumps implements Action {
  readonly type = SET_PUMPS;

  constructor(public payload: Pump[]) {}
}

export class UpdatePump implements Action {
  readonly type = UPDATE_PUMP;

  constructor(public payload: { index: number, pump: Pump}) {}
}

export class DeletePump implements Action {
  readonly type = DELETE_PUMP;

  constructor(public payload: number) {}
}

export class StorePumps implements Action {
  readonly type = STORE_PUMPS;
}

export class FetchPumps implements Action {
  readonly type = FETCH_PUMPS;
}

export class StoreN2s implements Action {
  readonly type = STORE_N2S;
  constructor(public payload: RosterN2[]) {}
}

export class FetchN2s implements Action {
  readonly type = FETCH_N2S;
}

export class UpdateN2 implements Action {
  readonly type = UPDATE_N2;

  constructor(public payload: {id: string, type: string, date: string}) {}
}

export class UpdateN2Success implements Action {
  readonly type = UPDATE_N2_SUCCESS;
}

export class RostersError implements Action {
  readonly type = ROSTERS_ERROR;

  constructor(public payload?: any) {}
}


export type RostersActions =
SetShiftsInsts |
FetchShiftsInsts |
AddPump |
SetPumps |
UpdatePump |
DeletePump |
StorePumps |
StoreN2s |
FetchN2s |
UpdateN2 |
UpdateN2Success |
RostersError |
FetchPumps;
