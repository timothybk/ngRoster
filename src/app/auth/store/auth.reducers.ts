import * as AuthActions from './auth.actions';
import { User } from '../user.model';

export interface State {
  user: User;
}
const initialState: State = {
  user: new User(null, 'GUEST')
};


/// Reducer function
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.GET_USER:
        return {
          ...state,
          loading: true
        };
    case AuthActions.AUTHENTICATED:
        return {
          ...state,
          user: {...action.payload},
          loading: false
        };
    case AuthActions.NOT_AUTHENTICATED:
        return {
          ...state,
          user: {...initialState},
          loading: false
        };
    case AuthActions.GOOGLE_LOGIN:
      return {
        ...state,
        loading: true
      };
    case AuthActions.AUTH_ERROR:
      return {
        ...state,
        error: {...action.payload},
        loading: false
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        loading: true
      };
    default:
      return {
        ...state
      };
  }
}
