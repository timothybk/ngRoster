import { Observable } from 'rxjs/Observable';
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

  rostersState: Observable<fromFirefighters.State>;
  sotedByN2: Observable<any>;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new FirefighterActions.FetchFirefighters());
    this.rostersState = this.store.select('firefighters');
  }

  ngOnInit() {

  }

}
