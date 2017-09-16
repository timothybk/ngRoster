import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyDCdGy0r8UMhpY8M5puikjTWK2sNxih42I',
      authDomain: 'ng-roster.firebaseapp.com'
    });
  }
}
