import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



import { Firefighter } from './../../shared/firefighter.model';
import * as fromApp from '../../store/app.reducer';
import * as fromFirefighters from '../store/firefighters.reducers';
import * as FirefighterActions from '../store/firefighters.actions';

@Component({
  selector: 'app-firefighter-list',
  templateUrl: './firefighter-list.component.html',
  styleUrls: ['./firefighter-list.component.css']
})
export class FirefighterListComponent implements OnInit {

  firefightersState: Observable<fromFirefighters.State>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {
    this.firefightersState = this.store.select('firefighters');
    this.store.dispatch(new FirefighterActions.FetchFirefighters());
  }

  ngOnInit() {
  }

  onNewFirefighter() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
