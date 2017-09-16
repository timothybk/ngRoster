import { Qualification } from './qualification.model';
import { Firefighter } from './firefighter.model';
import { AuthService } from './../auth/auth.service';
import { FirefightersService } from './../firefighters/firefighters.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/RX';

@Injectable()
export class DataStorageService {

  constructor(private http: Http, private ffService: FirefightersService, private authService: AuthService) {}

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
        this.ffService.setFirefighters(firefighters);
      }
    );
  }
}
