import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import * as fromRosters from '../../store/rosters.reducers';
import * as fromFirefighters from '../../../firefighters/store/firefighters.reducers';
import * as RostersActions from '../../store/rosters.actions';
import * as FirefighterActions from '../../../firefighters/store/firefighters.actions';

@Component({
  selector: 'app-roster-create-list',
  templateUrl: './roster-create-list.component.html',
  styleUrls: ['./roster-create-list.component.css']
})
export class RosterCreateListComponent implements OnInit {
  firefightersState: Observable<fromFirefighters.State>;
  dayMode: boolean;
  driverMode: boolean;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new FirefighterActions.FetchFirefighters());
    this.store.dispatch(new RostersActions.FetchShifts);
    this.firefightersState = this.store.select('firefighters');
  }

  ngOnInit() {
    this.dayMode = true;
    this.driverMode = false;
  }

  dayModeSwitch() {
    this.dayMode = !this.dayMode;
  }

  driverModeSwitch() {
    this.driverMode = !this.driverMode;
  }

}
