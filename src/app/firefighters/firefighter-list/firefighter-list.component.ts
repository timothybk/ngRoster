import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Firefighter } from './../../shared/firefighter.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromFirefighters from '../store/firefighters.reducers';

@Component({
  selector: 'app-firefighter-list',
  templateUrl: './firefighter-list.component.html',
  styleUrls: ['./firefighter-list.component.css']
})
export class FirefighterListComponent implements OnInit {

  firefightersState: Observable<{firefighters: Firefighter[]}>;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromFirefighters.AppState>
  ) { }

  ngOnInit() {
    this.firefightersState = this.store.select('firefighters');
  }

  onNewFirefighter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
