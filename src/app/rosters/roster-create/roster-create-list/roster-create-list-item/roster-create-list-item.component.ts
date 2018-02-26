import { Pump } from './../../../../shared/pump.model';
import { AllshiftArray } from './../../../../shared/allshift-array.model';
import { Shifts } from './../../../../shared/shifts.model';
import { ShiftInstance } from './../../../../shared/shift-instance.model';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Firefighter } from './../../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';

import * as fromApp from './../../../../store/app.reducer';
import * as RostersActions from './../../../store/rosters.actions';
import * as fromRosters from './../../../store/rosters.reducers';

@Component({
  selector: 'app-roster-create-list-item',
  templateUrl: './roster-create-list-item.component.html',
  styleUrls: ['./roster-create-list-item.component.css']
})
export class RosterCreateListItemComponent implements OnInit {
  @Input() firefighter: Firefighter;
  @Input() dayMode: boolean;
  @Input() driverMode: boolean;
  @Input() shifts: AllshiftArray[];

  rostersState: Observable<fromRosters.State>;

  displayNumber: number;

  constructor(private store: Store<fromApp.AppState>) {
    this.rostersState = this.store.select('rosters');
  }

  ngOnInit() {
    this.shifts = [];
  }

  getDisplayNumber(pump: string) {
    for (const appliance of this.shifts) {
      if (appliance.pump === pump) {
        return appliance.shifts.length;
      }
    }
  }
}
