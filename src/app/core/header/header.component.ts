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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: Observable<firebase.User>;
  token: string;

  constructor(private router: Router,
              public afAuth: AngularFireAuth,
              private store: Store<fromApp.AppState>) {
                this.user = afAuth.authState;
               }

  ngOnInit() {
  }

  getFirefighters() {
    this.store.dispatch(new FirefighterActions.FetchFirefighters());
    this.store.dispatch(new RostersActions.FetchPumps());
    this.store.dispatch(new RostersActions.FetchShiftsInsts());
  }

  signin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.user.subscribe(console.log);
  }

  signout() {
    this.afAuth.auth.signOut();
  }

}
