import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  errorMessage: string | null;
}

const initialState: State = {
  errorMessage: null
};

/// Reducer function
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.AUTH_ERROR:
    console.log("Auth Error: ", action.payload.message, action.payload.errorType);
    default:
      return {
        ...state
      };
  }
}
