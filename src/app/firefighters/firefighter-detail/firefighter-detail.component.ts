import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Firefighter } from './../../shared/firefighter.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as FirefighterActions from '../store/firefighters.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-firefighter-detail',
  templateUrl: './firefighter-detail.component.html',
  styleUrls: ['./firefighter-detail.component.css']
})
export class FirefighterDetailComponent implements OnInit {

  firefighter: Firefighter;
  id: number;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.subscription = this.store.select('firefighters')
          .subscribe(
            data => {
              this.firefighter = data.firefighters[this.id];
            }
          );
      });
  }

  onEditFirefighter() {
    this.store.dispatch(new FirefighterActions.StartEdit(this.id));
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteFirefighter() {
    this.store.dispatch(new FirefighterActions.DeleteFirefighter(this.id));
    this.router.navigate(['firefighters']);
  }

}
