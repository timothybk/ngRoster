import { Pump } from './../../shared/pump.model';
import { Shifts } from './../../shared/shifts.model';
import { ShiftBuilder } from './../../shared/shift-builder.model';
import * as RostersActions from '../store/rosters.actions';
import { FfPumpTotal } from '../../shared/ff-pump-total.model';

export interface State {
  allShifts: Shifts[];
  pumps: Pump[];
  ffPumpTotals: FfPumpTotal[];
}

const initialState: State = {
  allShifts: [],
  pumps: [{name: 'test', seats: ['one', 'two'], qualifications: ['nil']}],
  ffPumpTotals: []
};

export function rostersReducer(
  state = initialState,
  action: RostersActions.RostersActions
) {
  switch (action.type) {
    case RostersActions.SET_SHIFTS:
    return {
      ...state,
      allShifts: [...action.payload]
    };
    case RostersActions.SET_PUMPS:
    return {
      ...state,
      pumps: [...action.payload]
    };
    case RostersActions.SET_FF_PUMP_TOTALS:
    return {
      ...state,
      ffPumpTotals: [...action.payload]
    };
    case RostersActions.ROSTERS_ERROR:
    default:
      return state;
  }
}
