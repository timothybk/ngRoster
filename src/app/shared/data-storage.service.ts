import { Store } from '@ngrx/store';
import { RostersService } from './../rosters/rosters.service';
import { Pump } from './../rosters/pump.model';
import { Qualification } from './qualification.model';
import { Firefighter } from './firefighter.model';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/RX';
import * as FirefighterActions from '../firefighters/store/firefighters.actions';

@Injectable()
export class DataStorageService {

  constructor(
    private http: Http,
    private authService: AuthService,
    private rostersService: RostersService,
    private store: Store<{firefighters:
      {firefighters: Firefighter[]}}>
  ) {}

  getFirefighters() {
    this.http.get('/api/firefighters')
    .map((response: Response) => {
      const firefighters = response.json();
      const transformedFirefighters: Firefighter[] = [];
      for (const firefighter of firefighters) {
        const qualList: Qualification[] = [];
        firefighter.qualifications.forEach(qualification => {
          qualList.push(new Qualification(qualification.name));
        });
        transformedFirefighters.push(new Firefighter(
          firefighter._id,
          firefighter.number,
          firefighter.rank,
          firefighter.name,
          qualList));
      }
      return transformedFirefighters;
    })
    .subscribe(
      (firefighters: Firefighter[]) => {
        this.store.dispatch(new FirefighterActions.SetFirefighters(firefighters));
      }
    );
  }

  getPumps() {
    this.http.get('/api/pumps')
    .map((response: Response) => {
      const pumps = response.json();
      const transformedPumps: Pump[] = [];
      for (const pump of pumps) {
        const seatList: string[] = [];
        const qualList: Qualification[] = [];
        pump.qualifications.forEach(qualification => {
          qualList.push(new Qualification(qualification.name));
        });
        pump.seats.forEach(seat => {
          seatList.push(seat);
        });
        transformedPumps.push(new Pump(
          pump.name,
          seatList,
          qualList
        ));
      }
      return transformedPumps;
    })
    .subscribe(
      (pumps: Pump[]) => {
        this.rostersService.setPumps(pumps);
      }
    );
  }
}
