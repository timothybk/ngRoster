import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const REGISTER_USER          = 'REGISTER_USER';
export const AUTH_ERROR             = 'AUTH_ERROR';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: {username: string, password: string}) {}
}

export class AuthError implements Action {
  readonly type = AUTH_ERROR;
  constructor(public payload?: any) {}
}

export type AuthActions =
RegisterUser
| AuthError;
