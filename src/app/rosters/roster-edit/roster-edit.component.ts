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
      flyerCtrlDriver: ['', Validators.required],
      flyerCtrl1: ['', Validators.required],
      flyerCtrl2: ['', Validators.required],
      flyerCtrl3: ['', Validators.required]
    });
    this.runnerFormGroup = this._formBuilder.group({
      runnerCtrlDriver: ['', Validators.required],
      runnerCtrl1: ['', Validators.required],
      runnerCtrl2: ['', Validators.required],
      runnerCtrl3: ['', Validators.required]
    });
    this.rescuePumpFormGroup = this._formBuilder.group({
      rpCtrlDriver: ['', Validators.required],
      rpCtrl1: ['', Validators.required],
      rpCtrl2: ['', Validators.required],
      rpCtrl3: ['', Validators.required]

    });
    this.salvageFormGroup = this._formBuilder.group({
      salvageCtrlDriver: ['', Validators.required],
      salvageCtrlOffsider: ['', Validators.required]
    });
    this.brontoFormGroup = this._formBuilder.group({
      brontoCtrlDriver: ['', Validators.required],
      brontoCtrlOffsider: ['', Validators.required]
    });
    this.store.dispatch(new RostersActions.FetchFfPumpTotals());
  }

  onClick() {

  }

}
