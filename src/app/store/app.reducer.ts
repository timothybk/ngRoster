import { ActionReducerMap } from '@ngrx/store';

import * as fromFirefighters from '../firefighters/store/firefighters.reducers';
import * as fromRosters from '../rosters/store/rosters.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

export interface AppState {
  firefighters: fromFirefighters.State;
  rosters: fromRosters.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<AppState> = {
  firefighters: fromFirefighters.firefightersReducer,
  rosters: fromRosters.rostersReducer,
  auth: fromAuth.authReducer
};


