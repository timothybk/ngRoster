import { Firefighter } from './../../shared/firefighter.model';
import * as FirefighterActions from './firefighters.actions';

export interface State {
firefighters: Firefighter[];
editedFirefighter: Firefighter;
editedFirefighterIndex: number;
}

const initialState: State = {
  firefighters: [
      new Firefighter('first', 1, 'SF', 'first ff', []),
      new Firefighter('second', 2, 'QF', 'second ff', []),
      new Firefighter('third', 3, 'lvl 1', 'third ff', [])
    ],
  editedFirefighter: null,
  editedFirefighterIndex: -1
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
      const firefighter = state.firefighters[state.editedFirefighterIndex];
      const updatedFirefighter = {
        ...firefighter,
        ...action.payload
      };
      const firefighters = [...state.firefighters];
      firefighters[state.editedFirefighterIndex] = updatedFirefighter;
      return {
        ...state,
        firefighters: firefighters,
        editedFirefighter: null,
        editedFirefighterIndex: -1
      };
    case FirefighterActions.DELETE_FIREFIGHTER:
      const oldFirefighters = [...state.firefighters];
      oldFirefighters.splice(action.payload, 1);
      return {
        ...state,
        firefighters: oldFirefighters,
        editedFirefighter: null,
        editedFirefighterIndex: -1
      };
    case FirefighterActions.START_EDIT:
      const editedFirefighter = {...state.firefighters[action.payload]};
      return {
        ...state,
        editedFirefighter: editedFirefighter,
        editedFirefighterIndex: action.payload

      };
    case FirefighterActions.STOP_EDIT:
      return {
        ...state,
        editedFirefighter: null,
        editedFirefighterIndex: -1
      };
    default:
    return state;
  }
}
