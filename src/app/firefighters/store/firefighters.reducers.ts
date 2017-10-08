import { Firefighter } from './../../shared/firefighter.model';
import * as FirefighterActions from './firefighters.actions';

export interface State {
firefighters: Firefighter[];
}

const initialState: State = {
  firefighters: [
      {id: 'first', number: 1, rank: 'SF', name: 'first ff', nightDuty: {n2: new Date(), pn2: null}, qualifications: {md: false,
        rescue: false,
        aerial: false}},
      {id: 'second', number: 2, rank: 'QF', name: 'second ff', nightDuty: {n2: new Date(), pn2: null}, qualifications: {md: false,
        rescue: false,
        aerial: false}},
      {id: 'third', number: 3, rank: 'lvl 1', name: 'third ff', nightDuty: {n2: new Date(), pn2: null}, qualifications: {md: false,
        rescue: false,
        aerial: false}}
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
