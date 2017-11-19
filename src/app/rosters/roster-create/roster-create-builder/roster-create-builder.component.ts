import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

import * as fromApp from './../../../store/app.reducer';
import * as fromRosters from './../../store/rosters.reducers';

@Component({
  selector: 'app-roster-create-builder',
  templateUrl: './roster-create-builder.component.html',
  styleUrls: ['./roster-create-builder.component.css']
})
export class RosterCreateBuilderComponent implements OnInit {

  rostersState: Observable<fromRosters.State>;

  constructor(private store: Store<fromApp.AppState>) {
    this.rostersState = this.store.select('rosters');
  }

  ngOnInit() {
  }

}
