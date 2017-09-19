import { Qualification } from './../../shared/qualification.model';
import { Pump } from './../pump.model';
import * as RostersActions from '../store/rosters.actions';


export interface State {
  pumps: Pump[];
}

const initialState: State = {
  pumps: [
    new Pump('flyer', ['driver', 'one', 'two', 'three'], [new Qualification('rescue')]),
    new Pump('runner', ['driver', 'offsider'], [new Qualification('aerial')])
  ]
};

export function rostersReducer(state = initialState, action: RostersActions.RostersActions) {
  switch (action.type) {
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
    default:
    return state;
  }
}
