import { Store } from '@ngrx/store';
import { Firefighter } from './../../../shared/firefighter.model';
import { Component, OnInit, Input } from '@angular/core';
import * as FirefighterActions from '../../store/firefighters.actions';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-firefighter-item',
  templateUrl: './firefighter-item.component.html',
  styleUrls: ['./firefighter-item.component.css']
})
export class FirefighterItemComponent implements OnInit {

  @Input() firefighter: Firefighter;
  @Input() index: number;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
  }

}
