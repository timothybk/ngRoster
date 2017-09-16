import { AuthService } from './../auth/auth.service';
import { FirefightersService } from './../firefighters/firefighters.service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private ffService: FirefightersService, private authService: AuthService) {}

  storeFirefighters() {
    const token = this.authService.getToken();
    return this.http.put('https://ng-roster.firebaseio.com/firefighters.json?auth=' + token,
  this.ffService.getFirefighters());
  }
}
