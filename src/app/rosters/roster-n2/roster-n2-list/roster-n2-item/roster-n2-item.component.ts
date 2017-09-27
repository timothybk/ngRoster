import { Firefighter } from './../../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-roster-n2-item',
  templateUrl: './roster-n2-item.component.html',
  styleUrls: ['./roster-n2-item.component.css']
})
export class RosterN2ItemComponent implements OnInit {

  @Input() firefighter: Firefighter;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
