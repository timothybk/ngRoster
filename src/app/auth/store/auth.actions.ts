import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const TRY_SIGNUP             = 'TRY_SIGNUP';
export const TRY_SIGNIN             = 'TRY_SIGNIN';
export const SIGNUP                 = 'SIGNUP';
export const SIGNIN                 = 'SIGNIN';
export const SET_TOKEN              = 'SET_TOKEN';
export const LOGOUT                 = 'LOGOUT';

export class TrySignUp implements Action {
  readonly type = TRY_SIGNUP;
  constructor(public payload: User) {}
}

export class TrySignIn implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: User) {}
}

export class SignUp implements Action {
  readonly type = SIGNUP;
  constructor() {}
}

export class SignIn implements Action {
  readonly type = SIGNIN;
  constructor() {}
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
TrySignUp
| TrySignIn
| Logout
| SetToken;
