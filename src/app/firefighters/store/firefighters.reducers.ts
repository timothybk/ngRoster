import { Firefighter } from './../../shared/firefighter.model';
import * as FirefighterActions from './firefighters.actions';

const initialState = {
  firefighters: [
      new Firefighter('first', 1, 'SF', 'first ff', []),
      new Firefighter('second', 2, 'QF', 'second ff', []),
      new Firefighter('third', 3, 'lvl 1', 'third ff', [])
    ]
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
    default:
    return state;
  }
}
