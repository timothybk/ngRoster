import { Firefighter } from './../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-firefighter-item',
  templateUrl: './firefighter-item.component.html',
  styleUrls: ['./firefighter-item.component.css']
})
export class FirefighterItemComponent implements OnInit {

  @Input() firefighter: Firefighter;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
