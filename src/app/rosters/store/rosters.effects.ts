import { ShiftInstance } from './../shift-instance.model';
import { Pump } from './../pump.model';
import { Firefighter } from './../../shared/firefighter.model'
import { Qualification } from './../../shared/qualification.model';
import { Http, Response } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as rostersActions from './rosters.actions';


@Injectable()
export class RostersEffects {

  @Effect()
  shiftsInstFetch = this.actions$
  .ofType(rostersActions.FETCH_SHIFTSINSTS)
  .switchMap(
    (action: rostersActions.FetchShiftsInsts) => {
      return this.http.get('/api/shift-list');
    }
  )
  .map(
    (response: Response) => {
      const shiftsInsts = response.json();
      const transformedShiftsInsts: ShiftInstance[] = [];
      for (const shiftInst of shiftsInsts) {
        if (shiftInst.firefighter){
        const newFF = new Firefighter(shiftInst.firefighter.id,
                          shiftInst.firefighter.number,
                          shiftInst.firefighter.rank,
                          shiftInst.firefighter.name,
                          shiftInst.firefighter.qualifications);
                          
        const newPump = new Pump(shiftInst.pump.name,
                            shiftInst.pump.seats,
                            shiftInst.pump.qualifications);
        
        transformedShiftsInsts.push(new ShiftInstance(
          shiftInst.date,
          newFF,
          newPump,
          shiftInst.shift,
          shiftInst.md));
        }
      }
      return {
        type: rostersActions.SET_SHIFTSINSTS,
        payload: transformedShiftsInsts
      }
    }
  )

  @Effect()
  rosterFetch = this.actions$
  .ofType(rostersActions.FETCH_PUMPS)
  .switchMap(
    (action: rostersActions.FetchPumps) => {
      return this.http.get('/api/pumps');
    }
  )
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
    return {
      type: rostersActions.SET_PUMPS,
      payload: transformedPumps
    };
  }
);

  constructor(private actions$: Actions,
              private http: Http) {}
}
