import { FirefightersService } from './../firefighters/firefighters.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private ffService: FirefightersService) {}

  storeFirefighters() {
    return this.http.put('https://ng-roster.firebaseio.com/firefighters.json',
  this.ffService.getFirefighters());
  }
}
