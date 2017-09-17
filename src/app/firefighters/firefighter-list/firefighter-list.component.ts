import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { FirefightersService } from './../firefighters.service';
import { Firefighter } from './../../shared/firefighter.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-firefighter-list',
  templateUrl: './firefighter-list.component.html',
  styleUrls: ['./firefighter-list.component.css']
})
export class FirefighterListComponent implements OnInit, OnDestroy {

  firefightersState: Observable<{firefighters: Firefighter[]}>;
  subscription: Subscription;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ffService: FirefightersService,
    private store: Store<{firefighters:
      {firefighters: Firefighter[]}}>
  ) { }

  ngOnInit() {
    this.firefightersState = this.store.select('firefighters');
    // this.subscription = this.ffService.firefightersChanged
    //   .subscribe(
    //     (firefighters: Firefighter[]) => {
    //       this.firefighters = firefighters;
    //     }
    //   );
  }

  onNewFirefighter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
