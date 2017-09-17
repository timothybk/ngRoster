import { Firefighter } from './../shared/firefighter.model';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-firefighters',
  templateUrl: './firefighters.component.html',
  styleUrls: ['./firefighters.component.css']
})
export class FirefightersComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {

  }

}
