import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as firebase from 'firebase/app';
import * as fromApp from '../../store/app.reducer';
import * as FirefighterActions from '../../firefighters/store/firefighters.actions';
import * as RostersActions from '../../rosters/store/rosters.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  // constructor(private authService: AuthService) { }

  // ngOnInit() {
  // }

  // onSignin(form: NgForm) {
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   this.authService.signinUser(email, password);
  // }

  authState: Observable<fromAuth.State>;

    constructor(private store: Store<fromApp.AppState>,
                ) {}

    ngOnInit() {
      this.authState = this.store.select('auth');

      this.store.dispatch(new AuthActions.GetUser());
    }

    googleLogin() {
      this.store.dispatch(new AuthActions.GoogleLogin());
    }

    logout() {
      this.store.dispatch(new AuthActions.Logout());
    }
}
