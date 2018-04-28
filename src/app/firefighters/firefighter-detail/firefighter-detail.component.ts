import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Firefighter } from './../../shared/firefighter.model';
import * as FirefighterActions from '../store/firefighters.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromFirefighters from '../store/firefighters.reducers';


@Component({
  selector: 'app-firefighter-detail',
  templateUrl: './firefighter-detail.component.html',
  styleUrls: ['./firefighter-detail.component.css']
})
export class FirefighterDetailComponent implements OnInit {

  firefighter: Firefighter;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.store.select('firefighters')
          .subscribe((firefightersState: fromFirefighters.State) => {
            this.firefighter = firefightersState.firefighters[this.id];
          });
      });
  }

  onEditFirefighter() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteFirefighter() {
    this.store.dispatch(new FirefighterActions.DeleteFirefighter(this.firefighter.number));
    this.router.navigate(['firefighters']);
  }

}
