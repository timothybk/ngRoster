import { Pump } from './../../shared/pump.model';
import { Shifts } from './../../shared/shifts.model';
import { Action } from '@ngrx/store';
import { FfPumpTotal } from '../../shared/ff-pump-total.model';
import { FfCount } from '../../shared/ff-count.model';

export const UPDATE_BUILDER = 'UPDATE_BUILDER';
export const UPDATE_N2 = 'UPDATE_N2';
export const ROSTERS_ERROR = 'ROSTERS_ERROR';
export const FETCH_FF_PUMP_TOTALS = 'FETCH_FF_PUMP_TOTALS';
export const SET_FF_PUMP_TOTALS = 'SET_FF_PUMP_TOTALS';
export const FETCH_SHIFTS = 'FETCH_SHIFTS';
export const SET_SHIFTS = 'SET_SHIFTS';
export const FETCH_PUMPS = 'FETCH_PUMPS';
export const SET_PUMPS = 'SET_PUMPS';

export class UpdateBuilder implements Action {
  readonly type = UPDATE_BUILDER;

  constructor(public payload: {pump: number, position: string, firefighter: string}) {}
}

export class UpdateN2 implements Action {
  readonly type = UPDATE_N2;

  constructor(public payload: {firefighter: string, date: Date}) {}
}

export class RostersError implements Action {
  readonly type = ROSTERS_ERROR;

  constructor(public payload?: any) {}
}

export class FetchFfPumpTotals implements Action {
  readonly type = FETCH_FF_PUMP_TOTALS;

  constructor() {}
}

export class SetFfPumpTotals implements Action {
  readonly type = SET_FF_PUMP_TOTALS;

  constructor(public payload: FfCount[][]) {}
}

export class FetchShifts implements Action {
  readonly type = FETCH_SHIFTS;
}

export class SetShifts implements Action {
  readonly type = SET_SHIFTS;

  constructor(public payload: Shifts[]) {}
}

export class FetchPumps implements Action {
  readonly type = FETCH_PUMPS;
}

export class SetPumps implements Action {
  readonly type = SET_PUMPS;

  constructor(public payload: Pump[]) {}
}


export type RostersActions =
UpdateBuilder |
UpdateN2 |
RostersError|
FetchFfPumpTotals |
SetFfPumpTotals |
FetchShifts|
SetShifts |
FetchPumps |
SetPumps;
