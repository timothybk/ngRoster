import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-firefighters',
  templateUrl: './firefighters.component.html',
  styleUrls: ['./firefighters.component.css']
})
export class FirefightersComponent implements OnInit {

  constructor(private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getFirefighters();
  }

}
