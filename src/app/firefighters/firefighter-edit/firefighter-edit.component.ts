import { FirefightersService } from './../firefighters.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-firefighter-edit',
  templateUrl: './firefighter-edit.component.html',
  styleUrls: ['./firefighter-edit.component.css']
})
export class FirefighterEditComponent implements OnInit {
  id: number;
  editMode = false;
  firefighterForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private ffservice: FirefightersService) { }

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
    let ffId = '';
    let ffNumber;
    let ffRank = '';
    let ffName = '';
    const ffQuals = new FormArray([]);

    if (this.editMode) {
      const firefighter = this.ffservice.getFirefighter(this.id);
      ffId = firefighter.id;
      ffNumber = firefighter.number;
      ffRank = firefighter.rank;
      ffName = firefighter.name;
      if (firefighter['qualifications']) {
        for (const qualification of firefighter.qualifications) {
          ffQuals.push(

            new FormControl(qualification, Validators.required)

          );
        }
      }
    }

    this.firefighterForm = new FormGroup({
      'id': new FormControl(ffId, Validators.required),
      'number': new FormControl(ffNumber, Validators.required),
      'rank': new FormControl(ffRank, Validators.required),
      'name': new FormControl(ffName, Validators.required),
      'qualifications': ffQuals
    });
  }

  onAddQualification() {
    (<FormArray>this.firefighterForm.get('qualifications')).push(
      new FormControl(null, Validators.required)
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.ffservice.updateFirefighter(this.id, this.firefighterForm.value);
    } else {
      this.ffservice.addFirefighter(this.firefighterForm.value);
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
