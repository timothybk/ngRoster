import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import * as fromApp from '../../store/app.reducer';
import * as fromRosters from '../store/rosters.reducers';
import * as RostersActions from '../store/rosters.actions';

@Component({
  selector: 'app-roster-pumps',
  templateUrl: './roster-pumps.component.html',
  styleUrls: ['./roster-pumps.component.css']
})
export class RosterPumpsComponent implements OnInit {

  rostersState: Observable<fromRosters.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.rostersState = this.store.select('rosters');
  }
}
