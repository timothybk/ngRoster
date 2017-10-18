import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../../store/app.reducer';
import * as fromRosters from '../../store/rosters.reducers';
import * as fromFirefighters from '../../../firefighters/store/firefighters.reducers';
import * as RostersActions from '../../store/rosters.actions';

@Component({
  selector: 'app-roster-create-list',
  templateUrl: './roster-create-list.component.html',
  styleUrls: ['./roster-create-list.component.css']
})
export class RosterCreateListComponent implements OnInit {
  rostersState: Observable<fromRosters.State>;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.dispatch(new RostersActions.FetchShiftsInsts());
    this.rostersState = this.store.select('rosters');

  }

  ngOnInit() {
  }

}
