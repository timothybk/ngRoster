import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

/// Reducer function
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGOUT:
      localStorage.clear();
      return {
        ...state
        };
    default:
      return {
        ...state
      };
  }
}
