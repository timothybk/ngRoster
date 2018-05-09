import { Store } from '@ngrx/store';
import { User } from './../user.model';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

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

    @Effect()
    authSignin = this.actions$
      .ofType(authActions.SIGNIN)
      .map((action: authActions.Signin) => {
        return action.payload;
      })
      .switchMap(data => {
        const req = new HttpRequest(
          'POST',
          '/user/signin',
          data
        );
        return this.httpClient.request(req);
      })
      .map((event => {
        let token;
        if (event.type === HttpEventType.Response) {
          token = event.body['token'];
        }
        return {
          type: authActions.SET_TOKEN,
          payload: token
        };
      })
      );



  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private httpClient: HttpClient,
    private router: Router
  ) {}
}
