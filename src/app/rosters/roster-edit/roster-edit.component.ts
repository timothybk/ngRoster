import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from './../../store/app.reducer';
import * as RostersActions from './../store/rosters.actions';

@Component({
  selector: 'app-roster-edit',
  templateUrl: './roster-edit.component.html',
  styleUrls: ['./roster-edit.component.css']
})
export class RosterEditComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {

  }

  onClick() {
    this.store.dispatch(new RostersActions.FetchFfPumpTotals());
  }

}
