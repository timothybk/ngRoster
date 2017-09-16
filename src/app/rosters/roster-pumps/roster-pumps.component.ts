import { DataStorageService } from './../../shared/data-storage.service';
import { RostersService } from './../rosters.service';
import { Subscription } from 'rxjs/Subscription';
import { Pump } from './../pump.model';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-roster-pumps',
  templateUrl: './roster-pumps.component.html',
  styleUrls: ['./roster-pumps.component.css']
})
export class RosterPumpsComponent implements OnInit, OnDestroy {

  pumps: Pump[];
  subscription: Subscription;

  constructor(private rostersService: RostersService, private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.dataStorageService.getPumps();
    this.subscription = this.rostersService.pumpsChanged
    .subscribe(
      (pumps: Pump[]) => {
        this.pumps = pumps;
      }
    );
    // this.pumps = this.rostersService.getPumps();
  }

  ngOnDestroy() {

  }

}
