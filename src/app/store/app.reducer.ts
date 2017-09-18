import * as fromFirefighters from '../firefighters/store/firefighters.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  firefighters: fromFirefighters.State;
}

export const reducers: ActionReducerMap<AppState> = {
  firefighters: fromFirefighters.firefightersReducer
};


