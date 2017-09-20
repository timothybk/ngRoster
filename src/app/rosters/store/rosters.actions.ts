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


export type RostersActions =
SetShiftsInsts |
FetchShiftsInsts |
AddPump |
SetPumps |
UpdatePump |
DeletePump |
StorePumps |
FetchPumps;
