import { Firefighter } from './../shared/firefighter.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FirefightersService {

  firefightersChanged = new Subject<Firefighter[]>();

  private firefighters: Firefighter[] = [
    {id: 'first', number: 1, rank: 'SF', name: 'first ff', qualifications: []},
    {id: 'second', number: 2, rank: 'QF', name: 'second ff', qualifications: []},
    {id: 'third', number: 3, rank: 'lvl 1', name: 'third ff', qualifications: []}
  ];

  getFirefighter(index: number) {
    return this.firefighters[index];
  }

  updateFirefighter(index: number, newFirefighter: Firefighter) {
    this.firefighters[index] = newFirefighter;
    this.firefightersChanged.next(this.firefighters.slice());
  }

  deleteFirefighter(index: number) {
    this.firefighters.splice(index, 1);
    this.firefightersChanged.next(this.firefighters.slice());
  }
}


