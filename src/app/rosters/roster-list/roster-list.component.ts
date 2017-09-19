import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

import * as fromApp from '../../store/app.reducer';
import * as fromRosters from '../store/rosters.reducers';
import * as RostersActions from '../store/rosters.actions';

@Component({
  selector: 'app-roster-list',
  templateUrl: './roster-list.component.html',
  styleUrls: ['./roster-list.component.css']
})
export class RosterListComponent implements OnInit {

  rostersState: Observable<fromRosters.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.rostersState = this.store.select('rosters');
  }

}
