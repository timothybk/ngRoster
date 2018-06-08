import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const TRY_SIGNUP             = 'TRY_SIGNUP';
export const TRY_SIGNIN             = 'TRY_SIGNIN';
export const SIGNUP                 = 'SIGNUP';
export const SIGNIN_SUCCESS         = 'SIGNIN_SUCCESS';
export const SET_TOKEN              = 'SET_TOKEN';
export const LOGOUT                 = 'LOGOUT';
export const AUTH_ERROR             = 'AUTH_ERROR';

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

export class SignInSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
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

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}


export type AuthActions =
TrySignUp
| TrySignIn
| SignUp
| SignInSuccess
| Logout
| SetToken
| AuthError;
