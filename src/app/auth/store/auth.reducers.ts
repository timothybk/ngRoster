import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  token: string;
  errorMessage: string | null;
}

const initialState: State = {
  isAuthenticated: false,
  token: 'empty',
  user: null,
  errorMessage: null
};

/// Reducer function
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGNUP:
    case AuthActions.SIGNIN:
      return {
        ...state,
        isAuthenticated: true
        };
    case AuthActions.LOGOUT:
      return {
        ...state,
        token: 'empty',
        isAuthenticated: false
        };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return {
        ...state
      };
  }
}
