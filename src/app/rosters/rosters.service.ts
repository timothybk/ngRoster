import { Subject } from 'rxjs/Subject';
import { Pump } from './pump.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RostersService {

  pumpsChanged = new Subject<Pump[]>();

  private pumps: Pump[];

  setPumps(pumps: Pump[]) {
    this.pumps = pumps;
    this.pumpsChanged.next(this.pumps.slice());
  }

  getPumps() {
    return this.pumps.slice();
  }

}
