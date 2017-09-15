import { Firefighter } from './../../shared/firefighter.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FirefightersService } from './../firefighters.service';
import { Component, OnInit } from '@angular/core';

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
    private router: Router) { }

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
    this.ffService.deleteFirefighter(this.id);
    this.router.navigate(['firefighters']);
  }

}
