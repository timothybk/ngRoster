import { Store } from '@ngrx/store';
import { Firefighter } from './../../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgbDateStruct, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private store: Store<fromApp.AppState>,
              private ngbDateParserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {}

  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  trimDate(date: Date) {
    return date.toString().slice(0, 10);
  }

  onSubmit(f: NgForm) {
    const id = this.firefighter._id;
    const formDate = f.value.datePick;
    const date = this.ngbDateParserFormatter.format(formDate);

    this.store.dispatch(new RosterActions.UpdateN2( {firefighter: id, date: new Date(date)} ));
  }
}
