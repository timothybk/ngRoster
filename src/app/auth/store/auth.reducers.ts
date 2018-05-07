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
    case AuthActions.SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
        errorMessage: null
      };
    case AuthActions.AUTH_ERROR:
      console.log(action.payload);
      return {
        ...state,
      };
    default:
      return {
        ...state
      };
  }
}
