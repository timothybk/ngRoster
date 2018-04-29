import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import * as fromApp from '../../store/app.reducer';
import * as FirefighterActions from '../../firefighters/store/firefighters.actions';
import * as RostersActions from '../../rosters/store/rosters.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarCollapsed = true;

  constructor(private router: Router,
              private store: Store<fromApp.AppState>,
              ) {}

  ngOnInit() {
  }
}
