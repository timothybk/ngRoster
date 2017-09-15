import { Firefighter } from './../shared/firefighter.model';
import { Injectable } from '@angular/core';

@Injectable()
export class FirefightersService {
  private firefighters: Firefighter[] = [
    {id: 'first', number: 1, rank: 'SF', name: 'first ff', qualifications: ['rescue', 'md']},
    {id: 'second', number: 2, rank: 'QF', name: 'second ff', qualifications: ['rescue']},
    {id: 'third', number: 3, rank: 'lvl 1', name: 'third ff', qualifications: []}
  ];

  getFirefighters() {
    return this.firefighters.slice();
  }
}


