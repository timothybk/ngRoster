import { Subscription } from 'rxjs/Subscription';
import { Shifts } from './../../../shared/shifts.model';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';

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
export class RosterCreateListComponent implements OnInit, OnDestroy {
  firefightersState: Observable<fromFirefighters.State>;
  dayMode: boolean;
  driverMode: boolean;
  firefightersShifts: Shifts[];
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new FirefighterActions.FetchFirefighters());
    this.store.dispatch(new RostersActions.FetchShifts());
    this.store.dispatch(new RostersActions.FetchPumps());
    this.firefightersState = this.store.select('firefighters');
  }

  ngOnInit() {
    this.dayMode = true;
    this.driverMode = false;

    this.subscription = this.store
      .select('rosters')
      .subscribe((rostersState: fromRosters.State) => {
        this.firefightersShifts = [...rostersState.allShifts];
      });
  }

  shifts(firefighterNumber: number) {
    for (const firefighter of this.firefightersShifts) {
      if (firefighter.firefighter === firefighterNumber) {
        return firefighter.shifts;
      }
    }
  }

  dayModeSwitch() {
    this.dayMode = !this.dayMode;
  }

  driverModeSwitch() {
    this.driverMode = !this.driverMode;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
