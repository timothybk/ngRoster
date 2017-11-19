import { ShiftBuilder } from './../../shared/shift-builder.model';
import * as RostersActions from '../store/rosters.actions';

export interface State {
  currentShift: ShiftBuilder[];
}

const initialState: State = {
  currentShift: [
    {
      pump: 'flyer',
      driver: 'Firefighter',
      one: 'Firefighter',
      two: 'Firefighter',
      three: 'Firefighter'
    },
    {
      pump: 'runner',
      driver: 'Firefighter',
      one: 'Firefighter',
      two: 'Firefighter',
      three: 'Firefighter'
    },
    {
      pump: 'rescuepump',
      driver: 'Firefighter',
      one: 'Firefighter',
      two: 'Firefighter',
      three: 'Firefighter'
    },
    {
      pump: 'salvage',
      driver: 'Firefighter',
      one: 'Firefighter'
    },
    {
      pump: 'bronto',
      driver: 'Firefighter',
      one: 'Firefighter'
    }
  ]
};

export function rostersReducer(
  state = initialState,
  action: RostersActions.RostersActions
) {
  switch (action.type) {
    case RostersActions.UPDATE_BUILDER:
    const appliances = [...state.currentShift];
    const appliance = {...state.currentShift[action.payload.pump]};
    const updatedAppliance = {
      ...appliance,
      one: action.payload.firefighter
    };
    appliances[action.payload.pump] = updatedAppliance;
    return {
      ...state,
      currentShift: appliances
    };
    case RostersActions.ROSTERS_ERROR:
    default:
      return state;
  }
}
