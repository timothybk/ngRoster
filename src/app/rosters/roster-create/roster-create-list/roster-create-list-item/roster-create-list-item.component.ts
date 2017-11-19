import { ShiftBuilder } from './../../../../shared/shift-builder.model';
import { PumpCounts } from './../../../../shared/pump-counts.model';
import { ShiftInstance } from './../../../../shared/shift-instance.model';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Firefighter } from './../../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';

import * as fromApp from './../../../../store/app.reducer';
import * as RostersActions from './../../../store/rosters.actions';
import * as fromFirefighters from './../../../../firefighters/store/firefighters.reducers';

@Component({
  selector: 'app-roster-create-list-item',
  templateUrl: './roster-create-list-item.component.html',
  styleUrls: ['./roster-create-list-item.component.css']
})
export class RosterCreateListItemComponent implements OnInit {
  @Input() firefighter: Firefighter;
  @Input() dayMode: boolean;
  @Input() driverMode: boolean;

  displayNumber: number;

  firefightersState: Observable<fromFirefighters.State>;

  flyerAvgs: PumpCounts;
  runnerAvgs: PumpCounts;
  rescuepumpAvgs: PumpCounts;
  salvageAvgs: PumpCounts;
  brontoAvgs: PumpCounts;

  constructor(private store: Store<fromApp.AppState>) {
    this.firefightersState = this.store.select('firefighters');
    this.firefightersState.subscribe(data => {
      this.flyerAvgs = data.averages.flyer;
      this.runnerAvgs = data.averages.runner;
      this.rescuepumpAvgs = data.averages.rescuepump;
      this.salvageAvgs = data.averages.salvage;
      this.brontoAvgs = data.averages.bronto;
    });
    console.log(this.flyerAvgs.dayBack);
  }

  ngOnInit() {}

  getDisplayNumber(pump: ShiftInstance) {
    if (this.dayMode) {
      if (this.driverMode) {
        return pump.counts.dayDrive;
      } else {
        return pump.counts.dayBack;
      }
    } else {
      if (this.driverMode) {
        return pump.counts.nightDrive;
      } else {
        return pump.counts.nightBack;
      }
    }
  }

  getClass(pump: ShiftInstance) {
    let average = 1;
    let selection;
    let compare;
    if (pump.pump === 'flyer') {
      selection = this.flyerAvgs;
    } else if (pump.pump === 'runner') {
      selection = this.runnerAvgs;
    } else if (pump.pump === 'rescuepump') {
      selection = this.rescuepumpAvgs;
    } else if (pump.pump === 'salvage') {
      selection = this.salvageAvgs;
    } else if (pump.pump === 'bronto') {
      selection = this.brontoAvgs;
    }

    if (this.dayMode) {
      if (this.driverMode) {
        compare = pump.counts.dayDrive;
        average = selection.dayDrive;
      } else {
        compare = pump.counts.dayBack;
        average = selection.dayBack;
      }
    } else {
      if (this.driverMode) {
        compare = pump.counts.nightDrive;
        average = selection.nightDrive;
      } else {
        compare = pump.counts.nightBack;
        average = selection.dayBack;
      }
    }


    if (compare < average && compare > average - 10) {
      return 'btn-primary';
    } else if (compare < average) {
      return 'btn-success';
    } else if (compare < average + 10) {
      return 'btn-warning';
    } else {
      return 'btn-danger';
    }
  }

  sendToBuilder(pump) {
    let pumpIndex = 0;
    if (pump.pump === 'flyer') {
      pumpIndex = 0;
    } else if (pump.pump === 'runner') {
      pumpIndex = 1;
    } else if (pump.pump === 'rescuepump') {
      pumpIndex = 2;
    } else if (pump.pump === 'salvage') {
      pumpIndex = 3;
    } else if (pump.pump === 'bronto') {
      pumpIndex = 4;
    }
    this.store.dispatch(new RostersActions.UpdateBuilder({pump: pumpIndex, position: 'one', firefighter: this.firefighter.name}))
  }
}
