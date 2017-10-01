import { Store } from '@ngrx/store';
import { User } from './../user.model';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import * as AuthActions from './auth.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class AuthEffects {

  @Effect()
  getUser: Observable<AuthActions.AuthActions> = this.actions$
    .ofType(AuthActions.GET_USER)
    // .do((action) => console.log(`Received ${action.type}`))
    // .filter((action) => action.type === AuthActions.GET_USER)
    .map(
    (action: AuthActions.GetUser) => {
      return action.payload;
    }
    )
    .switchMap(
    payload => {
      return this.afAuth.authState;
    }
    )
    .map(
    authData => {
      if (authData) {
        const user = new User(authData.uid, authData.displayName);
        return new AuthActions.Authenticated(user);
      } else {
        return new AuthActions.NotAuthenticated();
      }
    })
    .catch(
    err => {
      return Observable.of(new AuthActions.AuthError());
    }
    );

  @Effect()
  login: Observable<AuthActions.AuthActions> = this.actions$
    .ofType(AuthActions.GOOGLE_LOGIN)
    // .do((action) => console.log(`Received ${action.type}`))
    // .filter((action) => action.type === AuthActions.GOOGLE_LOGIN)
    .map(
      (action: AuthActions.GoogleLogin) => {
        return action.payload;
      }
    )
    .switchMap(
      payload => {
        return Observable.fromPromise(this.googleLogin());
      }
    )
    .map(
      credential => {
        return new AuthActions.GetUser();
      }
    )
    .catch(
      err => {
        return Observable.of(new AuthActions.AuthError({error: err.msg}));
      }
    );

  @Effect()
  logout: Observable<AuthActions.AuthActions> = this.actions$
  .ofType(AuthActions.LOGOUT)
  .map(
    (action: AuthActions.Logout) => {
      return action.payload;
    }
  )
  .switchMap(
    payload => {
      return Observable.of(this.afAuth.auth.signOut());
    }
  )
  .map(
    authData => {
      return new AuthActions.NotAuthenticated();
    }
  )
  .catch(
    err => {
      return Observable.of(new AuthActions.AuthError({error: err.msg}));
    }
  );



  private googleLogin(): firebase.Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
  constructor(
    private actions$: Actions,
    private afAuth: AngularFireAuth,
    private store: Store<fromApp.AppState>) { }
}
