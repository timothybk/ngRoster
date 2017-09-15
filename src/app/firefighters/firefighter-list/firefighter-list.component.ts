import { FirefightersService } from './../firefighters.service';
import { Firefighter } from './../../shared/firefighter.model';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-firefighter-list',
  templateUrl: './firefighter-list.component.html',
  styleUrls: ['./firefighter-list.component.css']
})
export class FirefighterListComponent implements OnInit {

  firefighters: Firefighter[];

  constructor(private router: Router, private route: ActivatedRoute, private ffService: FirefightersService) { }

  ngOnInit() {
    this.firefighters = this.ffService.getFirefighters();
  }

  onNewFirefighter() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
