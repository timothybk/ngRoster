import { Averages } from './../../shared/averages.model';
import { Firefighter } from './../../shared/firefighter.model';
import * as FirefighterActions from './firefighters.actions';

export interface State {
firefighters: Firefighter[];
averages: Averages;
}

const initialState: State = {
  firefighters: [],
  averages: null
};

export function firefightersReducer(state = initialState, action: FirefighterActions.FirefighterActions) {
  switch (action.type) {
    case FirefighterActions.ADD_FIREFIGHTER:
      return {
        ...state,
        firefighters: [...state.firefighters, action.payload]
      };
    case FirefighterActions.SET_FIREFIGHTERS:
      return {
        ...state,
        firefighters: [...action.payload]
      };
    case FirefighterActions.STORE_AVERAGES:
      return {
        ...state,
        averages: {...action.payload}
      };
    case FirefighterActions.UPDATE_FIREFIGHTER:
      const firefighter = {...state.firefighters[action.payload.index]};
      const updatedFirefighter = {
        ...firefighter,
        ...action.payload.firefighter
      };
      const firefighters = [...state.firefighters];
      firefighters[action.payload.index] = updatedFirefighter;
      return {
        ...state,
        firefighters: firefighters
      };
    default:
    return state;
  }
}
