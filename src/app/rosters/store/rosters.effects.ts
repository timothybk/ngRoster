import { Pump } from './../../shared/pump.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import { map, switchMap } from "rxjs/operators";

import * as fromApp from './../../store/app.reducer';
import * as RostersActions from './rosters.actions';
import * as FirefighterActions from '../../firefighters/store/firefighters.actions';
import { ShiftsApiResponse } from '../../shared/shifts-api-response.model';
import { Router } from '@angular/router';

@Injectable()
export class RostersEffects {
  @Effect()
  updateN2 = this.actions$.pipe(
    ofType(RostersActions.UPDATE_N2),
    map((action: RostersActions.UpdateN2) => {
      return action.payload;
    }),
    switchMap(data => {
      const req = new HttpRequest(
        'POST',
        '/api/nightduty',
        data
      );
      return this.httpClient.request(req);
    }),
    map(() => {
      return {
        type: FirefighterActions.FETCH_FIREFIGHTERS
      }
    }));

    @Effect()
    rostersFetchFfPumpTotals = this.actions$.pipe(
      ofType(RostersActions.FETCH_FF_PUMP_TOTALS),
      switchMap((action: RostersActions.FetchFfPumpTotals) => {
        return this.httpClient.get<ShiftsApiResponse>('/api/ffpumptotals');
      }),
      map((data: ShiftsApiResponse) => {
        console.log(data);
        return {
          type: RostersActions.SET_FF_PUMP_TOTALS,
          payload: data
        };
      }));

    @Effect()
    pumpsFetch = this.actions$.pipe(
      ofType(RostersActions.FETCH_PUMPS),
      switchMap((action: RostersActions.FetchPumps) => {
        return this.httpClient.get<Pump[]>('/api/pumps');
      }),
      map((data: Pump[]) => {
        return {
          type: RostersActions.SET_PUMPS,
          payload: data
        };
      }));

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}
}
