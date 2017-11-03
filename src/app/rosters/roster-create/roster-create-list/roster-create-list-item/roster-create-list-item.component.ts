import { ShiftInstance } from './../../../../shared/shift-instance.model';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Firefighter } from './../../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';

import * as fromApp from './../../../../store/app.reducer';
import * as fromFirefighters from './../../../../firefighters/store/firefighters.reducers';

@Component({
  selector: 'app-roster-create-list-item',
  templateUrl: './roster-create-list-item.component.html',
  styleUrls: ['./roster-create-list-item.component.css']
})
export class RosterCreateListItemComponent implements OnInit {
  @Input() firefighter: Firefighter;
  firefightersState: Observable<fromFirefighters.State>;
  flyerAvg: number;
  runnerAvg: number;
  rescuepumpAvg: number;
  salvageAvg: number;
  brontoAvg: number;

  constructor(private store: Store<fromApp.AppState>) {
    this.firefightersState = this.store.select('firefighters');
    this.firefightersState.subscribe(
      (data) => {
        this.flyerAvg = data.averages.flyer;
        this.runnerAvg = data.averages.runner;
        this.rescuepumpAvg = data.averages.rescuepump;
        this.salvageAvg = data.averages.salvage;
        this.brontoAvg = data.averages.salvage;
      }
    );
    console.log(this.rescuepumpAvg);
   }

  ngOnInit() {}

  getClass(pump: ShiftInstance) {
    let average = 1;
    if (pump.pump === 'flyer') {
      average = this.flyerAvg;
    } else if (pump.pump === 'runner') {
      average = this.runnerAvg;
    } else if (pump.pump === 'rescuepump') {
      average = this.rescuepumpAvg;
    } else if (pump.pump === 'salvage') {
      average = this.salvageAvg;
    } else if (pump.pump === 'bronto') {
      average = this.brontoAvg;
    }

    if (pump.count < average) {
      return 'btn-success';
    } else if (pump.count < (average + 10)) {
      return 'btn-warning';
    } else {
      return 'btn-danger';
    }
  }

}
