import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private router: Router,
              public afAuth: AngularFireAuth,
              private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    // this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    //   .then(
    //     user => {
    //       this.store.dispatch(new AuthActions.Signup());
    //       this.afAuth.auth.currentUser.getIdToken()
    //       .then(
    //         (token: string) => {
    //           this.store.dispatch(new AuthActions.SetToken(token));
    //         }
    //       );
    //     }
    //   )
    //   .catch(
    //     error => console.log(error)
    //   );
  }

  signinUser(email: string, password: string) {
    // this.afAuth.auth.signInWithEmailAndPassword(email, password)
    //   .then(
    //     response => {
    //       this.store.dispatch(new AuthActions.Signin());
    //       this.router.navigate(['/']);
    //       this.afAuth.auth.currentUser.getIdToken()
    //         .then(
    //           (token: string) => {
    //             console.log(token);
    //             this.store.dispatch(new AuthActions.SetToken(token));
    //           }
    //         );
    //     }
    //   );
  }

  logout() {
    // this.afAuth.auth.signOut();
    // this.store.dispatch(new AuthActions.Logout());
  }

}
