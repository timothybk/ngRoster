import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const TRY_SIGNUP             = 'TRY_SIGNUP';
export const TRY_SIGNIN                 = 'SIGNIN';
export const SET_TOKEN              = 'SET_TOKEN';
export const LOGOUT                 = 'LOGOUT';

export class TrySignup implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: User) {}
}

export class TrySignIn implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: User) {}
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() {}
}


export type AuthActions =
TrySignup
| TrySignIn
| Logout
| SetToken;
