import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import * as fromFirefighters from '../../firefighters/store/firefighters.reducers'
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-roster-n2',
  templateUrl: './roster-n2.component.html',
  styleUrls: ['./roster-n2.component.css']
})
export class RosterN2Component implements OnInit {

  firefightersState: Observable<fromFirefighters.State>

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

}
