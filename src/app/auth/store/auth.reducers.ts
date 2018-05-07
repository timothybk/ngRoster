import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  user: User;
}

const initialState: State = {
  user: {username: 'GUEST', password: 'password'}
};

/// Reducer function
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
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
