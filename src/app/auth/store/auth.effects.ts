import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

import { User } from './../user.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';

import * as fromApp from './../../store/app.reducer';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  authSignin = this.actions$
  .ofType(authActions.TRY_SIGNIN)
  .map((action: authActions.TrySignIn) => {
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

      localStorage.setItem('token', token);

      this.router.navigate(['/']);
    }
  }));

  @Effect({dispatch: false})
  authLogout = this.actions$
  .ofType(authActions.LOGOUT)
  .do(() => {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  });

  // ======old sign up=======
  // there is no sign up now

  // @Effect({dispatch: false})
  // authRegister = this.actions$
  //   .ofType(authActions.TRY_SIGNUP)
  //   .map((action: authActions.TrySignUp) => {
  //     return action.payload;
  //   })
  //   .switchMap(data => {
  //     const req = new HttpRequest(
  //       'POST',
  //       '/user/register',
  //       data,
  //       {
  //         reportProgress: true
  //       }
  //     );
  //     return this.httpClient.request(req);
  //   })
  //   .map((res) => {
  //     this.router.navigate(['/']);
  //   });

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private httpClient: HttpClient,
    private router: Router
  ) {}
}
