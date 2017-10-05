import { RosterN2 } from './../roster-n2/roster-n2.model';
import { Firefighter } from './../../shared/firefighter.model';
import { ShiftInstance } from './../shift-instance.model';
import { Qualification } from './../../shared/qualification.model';
import { Pump } from './../pump.model';
import * as RostersActions from '../store/rosters.actions';


export interface State {
  shiftsInsts: ShiftInstance[];
  pumps: Pump[];
  n2s: RosterN2[];
}

const initialState: State = {
  pumps: [
    new Pump('flyer', ['driver', 'one', 'two', 'three'], [new Qualification('rescue')]),
    new Pump('runner', ['driver', 'offsider'], [new Qualification('aerial')])
  ],
  shiftsInsts: [
    new ShiftInstance('20/12/56',
    {key: 'is', number: 9204, rank: 'sf', name: 'tim', qualifications: []},
    new Pump('flyer', ['driver', 'one', 'two', 'three'], [new Qualification('rescue')]), 'day', false)
  ],
  n2s: []
};

export function rostersReducer(state = initialState, action: RostersActions.RostersActions) {
  switch (action.type) {
    case RostersActions.SET_SHIFTSINSTS:
    return {
      ...state,
      shiftsInsts: [...action.payload]
    };
    case RostersActions.ADD_PUMP:
      return {
        ...state,
        pumps: [...state.pumps, action.payload]
      };
    case RostersActions.SET_PUMPS:
      return {
        ...state,
        pumps: [...action.payload]
      };
    case RostersActions.UPDATE_PUMP:
      const pump = {...state.pumps[action.payload.index]};
      const updatedPump = {
        ...pump,
        ...action.payload.pump
      };
      const pumps = [...state.pumps];
      pumps[action.payload.index] = updatedPump;
      return {
        ...state,
        pumps: pumps
      };
    case RostersActions.DELETE_PUMP:
      const oldPumps = [...state.pumps];
      oldPumps.splice(action.payload, 1);
      return {
        ...state,
        pumps: oldPumps
      };
      case RostersActions.STORE_N2S:
      return {
        ...state,
        n2s: [...action.payload]
      };
    case RostersActions.UPDATE_N2_SUCCESS:
    case RostersActions.ROSTERS_ERROR:
    default:
    return state;
  }
}
