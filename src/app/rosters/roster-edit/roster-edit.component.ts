import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';

import * as fromApp from './../../store/app.reducer';
import * as fromRosters from './../store/rosters.reducers';
import * as RostersActions from './../store/rosters.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-roster-edit',
  templateUrl: './roster-edit.component.html',
  styleUrls: ['./roster-edit.component.css']
})
export class RosterEditComponent implements OnInit {
  flyerFormGroup: FormGroup;
  runnerFormGroup: FormGroup;
  rescuePumpFormGroup: FormGroup;
  salvageFormGroup: FormGroup;
  brontoFormGroup: FormGroup;

  rostersState: Observable<fromRosters.State>

  constructor(private store: Store<fromApp.AppState>, private _formBuilder: FormBuilder) {
    this.rostersState = this.store.select('rosters');
  }

  ngOnInit() {
    this.flyerFormGroup = this._formBuilder.group({
      firstCtrlDriver: ['', Validators.required],
      firstCtrl1: ['', Validators.required],
      firstCtrl2: ['', Validators.required],
      firstCtrl3: ['', Validators.required],
    });
    this.runnerFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.rescuePumpFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.salvageFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.brontoFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });
    this.store.dispatch(new RostersActions.FetchFfPumpTotals());
  }

  onClick() {

  }

}
