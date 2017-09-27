import { Store } from '@ngrx/store';
import { Firefighter } from './../../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import * as fromApp from './../../../../store/app.reducer';
import * as RosterActions from './../../../store/rosters.actions';

const now = new Date();

@Component({
  selector: 'app-roster-n2-item',
  templateUrl: './roster-n2-item.component.html',
  styleUrls: ['./roster-n2-item.component.css']
})
export class RosterN2ItemComponent implements OnInit {

  @Input() firefighter: Firefighter;
  @Input() index: number;

  model: NgbDateStruct;
  date: { year: number, month: number, day: number };

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  onSubmit(type: string, f: NgForm) {
    const id = this.firefighter.key;
    const formDate = f.value.datePick;
    const date = formDate.year + '-' + formDate.month + '-' + formDate.day;

    this.store.dispatch(new RosterActions.UpdateN2( {id: this.firefighter.key, type: type, date: date} ));
  }
}
