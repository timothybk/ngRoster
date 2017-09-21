import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

import { Firefighter } from './../../shared/firefighter.model';
import * as FirefighterActions from '../store/firefighters.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromFirefighter from '../store/firefighters.reducers';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-firefighter-edit',
  templateUrl: './firefighter-edit.component.html',
  styleUrls: ['./firefighter-edit.component.css']
})
export class FirefighterEditComponent implements OnInit {
  id: number;
  editMode = false;
  firefighterForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  private initForm() {
    let ffNumber;
    let ffRank = '';
    let ffName = '';
    const ffQuals = new FormArray([]);

    if (this.editMode) {
      this.store.select('firefighters')
      .take(1)
      .subscribe(
        (firefightersState: fromFirefighter.State) => {
          const firefighter = firefightersState.firefighters[this.id];
          ffNumber = firefighter.number;
          ffRank = firefighter.rank;
          ffName = firefighter.name;
          if (firefighter['qualifications']) {
            for (const qualification of firefighter.qualifications) {
              ffQuals.push(
                new FormGroup({
                'name': new FormControl(qualification.name, Validators.required)
              })
              );
            }
          }
        }
      );

    }

    this.firefighterForm = new FormGroup({
      'number': new FormControl(ffNumber, Validators.required),
      'rank': new FormControl(ffRank, Validators.required),
      'name': new FormControl(ffName, Validators.required),
      'qualifications': ffQuals
    });
  }

  onAddQualification() {
    (<FormArray>this.firefighterForm.get('qualifications')).push(
      new FormGroup({
      'name': new FormControl(null, Validators.required)
    })
    );
  }

  onDeleteQualification(index: number) {
    (<FormArray>this.firefighterForm.get('qualifications')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new FirefighterActions.UpdateFirefighter({index: this.id, firefighter: this.firefighterForm.value}));
    } else {
      this.store.dispatch(new FirefighterActions.AddFirefighter(this.firefighterForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  getControls() {
    return (<FormArray>this.firefighterForm.get('qualifications')).controls;
  }
}
