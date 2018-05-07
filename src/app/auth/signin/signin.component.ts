import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from './../../store/app.reducer';
import * as AuthActions from './../store/auth.actions';
import { User } from '../user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const user: User = {
      username: form.value.email,
      password: form.value.password
    };

    this.store.dispatch(
      new AuthActions.Signin(user)
    );
  }

}
