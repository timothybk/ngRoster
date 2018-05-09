import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const REGISTER_USER          = 'REGISTER_USER';
export const SIGNIN                 = 'SIGNIN';
export const SET_TOKEN              = 'SET_TOKEN';
export const LOGOUT                 = 'LOGOUT';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: User) {}
}

export class Signin implements Action {
  readonly type = SIGNIN;
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
RegisterUser
| Signin
| Logout
| SetToken;
