import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const TRY_SIGNIN             = 'TRY_SIGNIN';
export const LOGOUT                 = 'LOGOUT';
export const AUTH_ERROR             = 'AUTH_ERROR';

export class TrySignIn implements Action {
  readonly type = TRY_SIGNIN;
  constructor(public payload: User) {}
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
| TrySignIn
| Logout
| AuthError;
