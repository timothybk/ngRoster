import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import * as fromApp from '../../store/app.reducer';
import * as fromAuth from '../../auth/store/auth.reducers';
import * as FirefighterActions from '../../firefighters/store/firefighters.actions';
import * as RostersActions from '../../rosters/store/rosters.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  checkAuth() {
    return localStorage.getItem('token') !== null;
  }

  ngOnInit() {
  }
}
