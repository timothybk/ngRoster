import { Store } from '@ngrx/store';
import { Firefighter } from './../../shared/firefighter.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FirefightersService } from './../firefighters.service';
import { Component, OnInit } from '@angular/core';
import * as FirefighterActions from '../store/firefighters.actions';

@Component({
  selector: 'app-firefighter-detail',
  templateUrl: './firefighter-detail.component.html',
  styleUrls: ['./firefighter-detail.component.css']
})
export class FirefighterDetailComponent implements OnInit {

  firefighter: Firefighter;
  id: number;

  constructor(private ffService: FirefightersService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{firefighters:
      {firefighters: Firefighter[]}}>
    ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.firefighter = this.ffService.getFirefighter(this.id);
      });
  }

  onEditFirefighter() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteFirefighter() {
    this.store.dispatch(new FirefighterActions.DeleteFirefighter(this.id));
    this.router.navigate(['firefighters']);
  }

}
