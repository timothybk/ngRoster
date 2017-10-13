import { Firefighter } from './../../shared/firefighter.model';
import * as FirefighterActions from './firefighters.actions';

export interface State {
firefighters: Firefighter[];
}

const initialState: State = {
  firefighters: []
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
    case FirefighterActions.DELETE_FIREFIGHTER:
      const oldFirefighters = [...state.firefighters];
      oldFirefighters.splice(action.payload, 1);
      return {
        ...state,
        firefighters: oldFirefighters
      };
    default:
    return state;
  }
}
