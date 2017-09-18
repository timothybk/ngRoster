import { Subscription } from 'rxjs/Subscription';
import { Firefighter } from './../../shared/firefighter.model';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as FirefighterActions from '../store/firefighters.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-firefighter-edit',
  templateUrl: './firefighter-edit.component.html',
  styleUrls: ['./firefighter-edit.component.css']
})
export class FirefighterEditComponent implements OnInit, OnDestroy {
  firefighter: Firefighter;
  editMode = false;
  firefighterForm: FormGroup;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('firefighters')
      .subscribe(
        data => {
          if (data.editedFirefighterIndex > -1) {
            this.firefighter = data.editedFirefighter;
            this.editMode = true;
          } else {
            this.editMode = false;
          }
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
      const firefighter = this.firefighter;
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
      this.store.dispatch(new FirefighterActions.UpdateFirefighter(this.firefighterForm.value));
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

  ngOnDestroy() {
    this.store.dispatch(new FirefighterActions.StopEdit());
    this.subscription.unsubscribe();
  }

}
