import { Store } from '@ngrx/store';
import { User } from './../user.model';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import * as fromApp from './../../store/app.reducer';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  @Effect({dispatch: false})
  authRegister = this.actions$
    .ofType(authActions.REGISTER_USER)
    .map((action: authActions.RegisterUser) => {
      return action.payload;
    })
    .switchMap(data => {
      const req = new HttpRequest(
        'POST',
        '/user/register',
        data,
        {
          reportProgress: true
        }
      );
      return this.httpClient.request(req);
    })
    .map((res) => {
      console.log(res);
    });

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private httpClient: HttpClient
  ) {}
}
