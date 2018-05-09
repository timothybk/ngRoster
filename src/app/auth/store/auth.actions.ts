import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const REGISTER_USER          = 'REGISTER_USER';
export const SIGNIN                 = 'SIGNIN';

export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  constructor(public payload: User) {}
}

export class Signin implements Action {
  readonly type = SIGNIN;
  constructor(public payload: User) {}
}


export type AuthActions =
RegisterUser
| Signin;
