import { ActionReducerMap } from '@ngrx/store';

import * as fromFirefighters from '../firefighters/store/firefighters.reducers';
import * as fromRosters from '../rosters/store/rosters.reducers';

export interface AppState {
  firefighters: fromFirefighters.State;
  rosters: fromRosters.State;
}

export const reducers: ActionReducerMap<AppState> = {
  firefighters: fromFirefighters.firefightersReducer,
  rosters: fromRosters.rostersReducer
};


