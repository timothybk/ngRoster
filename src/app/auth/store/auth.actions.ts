import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const REGISTER_USER          = 'REGISTER_USER';
export const SIGNIN                 = 'SIGNIN';
export const SIGNIN_SUCCESS         = 'SIGNIN_SUCCESS';
export const SET_TOKEN              = 'SET_TOKEN';
export const AUTH_ERROR             = 'AUTH_ERROR';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: User) {}
}

export class Signin implements Action {
  readonly type = SIGNIN;
  constructor(public payload: User) {}
}

export class SigninSuccess implements Action {
  readonly type = SIGNIN_SUCCESS;
  constructor(public payload: User) {}
}

export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload?: any) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}

export type AuthActions =
RegisterUser
| AuthError
| Signin
| SigninSuccess
| SetToken;
