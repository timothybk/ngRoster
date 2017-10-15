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
  key: string;

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
    let ffMd = false;
    let ffRescue = false;
    let ffAerial = false;

    if (this.editMode) {
      this.store.select('firefighters')
        .take(1)
        .subscribe(
        (firefightersState: fromFirefighter.State) => {
          const firefighter = firefightersState.firefighters[this.id];
          this.key = firefighter.id;
          ffNumber = firefighter.number;
          ffRank = firefighter.rank;
          ffName = firefighter.name;
          ffMd = firefighter.qualifications.md;
          ffRescue = firefighter.qualifications.rescue;
          ffAerial = firefighter.qualifications.aerial;
        }
        );

    }

    this.firefighterForm = new FormGroup({
      'number': new FormControl(ffNumber, Validators.required),
      'rank': new FormControl(ffRank, Validators.required),
      'name': new FormControl(ffName, Validators.required),
      'md': new FormControl(ffMd, Validators.required),
      'rescue': new FormControl(ffRescue, Validators.required),
      'aerial': new FormControl(ffAerial, Validators.required)
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new FirefighterActions.UpdateDbFirefighter({ key: this.key, firefighter: this.firefighterForm.value }));
    } else {
      const dispatchedFirefighter = {
        number: this.firefighterForm.value.number,
        rank: this.firefighterForm.value.rank,
        name: this.firefighterForm.value.name,
        nightDuty: {
          n2: new Date(),
          pn2: null
        },
        qualifications: {
          md: this.firefighterForm.value.md,
          rescue: this.firefighterForm.value.rescue,
          aerial: this.firefighterForm.value.aerial
        },
        shifts: {
          f1: 0,
          lp1: 0,
          r1: 0,
          rp1: 0,
          run1: 0,
          spare: 0,
          total: 0
        }
      };
      this.store.dispatch(new FirefighterActions.StoreFirefighter(dispatchedFirefighter));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  getControls() {
    return (<FormArray>this.firefighterForm.get('qualifications')).controls;
  }
}
