import { Shifts } from './../../shared/shifts.model';
import { ShiftBuilder } from './../../shared/shift-builder.model';
import * as RostersActions from '../store/rosters.actions';

export interface State {
  allShifts: Shifts[];
}

const initialState: State = {
  allShifts: []
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
    case RostersActions.ROSTERS_ERROR:
    default:
      return state;
  }
}
