import { Firefighter } from './../shared/firefighter.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FirefightersService {

  firefightersChanged = new Subject<Firefighter[]>();

  private firefighters: Firefighter[] = [
    {id: 'first', number: 1, rank: 'SF', name: 'first ff', qualifications: ['rescue', 'md']},
    {id: 'second', number: 2, rank: 'QF', name: 'second ff', qualifications: ['rescue']},
    {id: 'third', number: 3, rank: 'lvl 1', name: 'third ff', qualifications: []}
  ];

  getFirefighters() {
    return this.firefighters.slice();
  }

  getFirefighter(index: number) {
    return this.firefighters[index];
  }

  addFirefighter(firefighter: Firefighter) {
    this.firefighters.push(firefighter);
    this.firefightersChanged.next(this.firefighters.slice());
  }

  updateFirefighter() {

  }


}


