import { AuthService } from './../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import * as firebase from 'firebase/app';
import * as fromApp from '../../store/app.reducer';
import * as FirefighterActions from '../../firefighters/store/firefighters.actions';
import * as RostersActions from '../../rosters/store/rosters.actions';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<fromAuth.State>;

  navbarCollapsed = true;
  components = ['1', '2', '3'];

  constructor(private router: Router,
              private store: Store<fromApp.AppState>,
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
