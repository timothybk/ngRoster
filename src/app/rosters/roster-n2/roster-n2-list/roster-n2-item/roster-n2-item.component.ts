import { Store } from '@ngrx/store';
import { Firefighter } from './../../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from './../../../../store/app.reducer';
import * as RosterActions from './../../../store/rosters.actions';

@Component({
  selector: 'app-roster-n2-item',
  templateUrl: './roster-n2-item.component.html',
  styleUrls: ['./roster-n2-item.component.css']
})
export class RosterN2ItemComponent implements OnInit {

  @Input() firefighter: Firefighter;
  @Input() index: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {}

  trimDate(date: Date) {
    return date.toString().slice(0, 10);
  }

  onSubmit(f: NgForm) {
    const id = this.firefighter._id;
    const date = f.value.datePick;
    console.log(date);
    this.store.dispatch(new RosterActions.UpdateN2( {firefighter: id, date: new Date(date)} ));
  }
}
