import { AuthService } from './../../auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { DropdownDirective } from './../../shared/dropdown.directive';
import * as firebase from 'firebase/app';
import * as fromApp from '../../store/app.reducer';
import * as FirefighterActions from '../../firefighters/store/firefighters.actions';
import * as RostersActions from '../../rosters/store/rosters.actions';
import * as fromAuth from '../../auth/store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  token: string;
  authState: Observable<fromAuth.State>;

  constructor(private router: Router,
              public afAuth: AngularFireAuth,
              private store: Store<fromApp.AppState>,
              private authService: AuthService) {
                this.user = afAuth.authState;
               }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    // this.store.dispatch(new FirefighterActions.StoreFirefighters());
  }

  onFetchData() {
    this.store.dispatch(new FirefighterActions.FetchFirefighters());
  }

  getFirefighters() {
    this.store.dispatch(new FirefighterActions.FetchFirefighters());
    this.store.dispatch(new RostersActions.FetchPumps());
    this.store.dispatch(new RostersActions.FetchShiftsInsts());
  }

  onLogout() {
    this.authService.logout();
  }

}
