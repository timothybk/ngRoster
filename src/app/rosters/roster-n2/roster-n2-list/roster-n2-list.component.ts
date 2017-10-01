import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromFirefighters from '../../../firefighters/store/firefighters.reducers';
import * as fromApp from '../../../store/app.reducer';
import * as FirefighterActions from './../../../firefighters/store/firefighters.actions'

@Component({
  selector: 'app-roster-n2-list',
  templateUrl: './roster-n2-list.component.html',
  styleUrls: ['./roster-n2-list.component.css']
})
export class RosterN2ListComponent implements OnInit {

  firefightersState: Observable<fromFirefighters.State>;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new FirefighterActions.FetchFirefighters());
  }

  ngOnInit() {
    this.firefightersState = this.store.select('firefighters');
  }

}
