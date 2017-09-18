import { Firefighter } from './../../shared/firefighter.model';
import { Store } from '@ngrx/store';
import { FirefightersService } from './../firefighters.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as FirefighterActions from '../store/firefighters.actions';
import * as fromFirefighters from '../store/firefighters.reducers';

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
    private ffservice: FirefightersService,
    private store: Store<fromFirefighters.AppState>
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
      const firefighter = this.ffservice.getFirefighter(this.id);
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
