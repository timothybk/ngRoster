import { Ranking } from './../../../ranking.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-roster-create-list-item',
  templateUrl: './roster-create-list-item.component.html',
  styleUrls: ['./roster-create-list-item.component.css']
})
export class RosterCreateListItemComponent implements OnInit {
  @Input() firefighter: Ranking;

  constructor() { }

  ngOnInit() {
  }

}
