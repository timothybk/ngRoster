import { Firefighter } from './../../../shared/firefighter.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromRosters from '../../store/rosters.reducers';
import * as fromFirefighters from '../../../firefighters/store/firefighters.reducers';
import * as fromApp from '../../../store/app.reducer';
import * as FirefighterActions from './../../../firefighters/store/firefighters.actions';
import * as RostersActions from '../../store/rosters.actions';

@Component({
  selector: 'app-roster-n2-list',
  templateUrl: './roster-n2-list.component.html',
  styleUrls: ['./roster-n2-list.component.css']
})
export class RosterN2ListComponent implements OnInit {
  sortedList: Firefighter[];

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new FirefighterActions.FetchFirefighters());

    this.store
      .select('firefighters')
      .subscribe((data: fromFirefighters.State) => {
        // order firefighters by n2 timestamp
        const unsortedArray: Firefighter[] = data.firefighters;
        this.sortedList = unsortedArray.sort(function(a, b) {
          const aInt = new Date(a.n2).getTime();
          const bInt = new Date(b.n2).getTime();
          return aInt - bInt;
        });
      });
  }

  ngOnInit() {}
}
