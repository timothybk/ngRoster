import { Shifts } from './../../shared/shifts.model';
import { Pump } from './../../shared/pump.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as fromApp from './../../store/app.reducer';
import * as RostersActions from './rosters.actions';
import * as FirefighterActions from '../../firefighters/store/firefighters.actions';
import { ShiftInstance } from '../../shared/shift-instance.model';
import { FfPumpTotal } from '../../shared/ff-pump-total.model';

@Injectable()
export class RostersEffects {
  @Effect({dispatch: false})
  updateN2 = this.actions$
    .ofType(RostersActions.UPDATE_N2)
    .map((action: RostersActions.UpdateN2) => {
      return action.payload;
    })
    .switchMap(data => {
      const req = new HttpRequest(
        'POST',
        '/api/nightduty',
        data,
        {
          reportProgress: true
        }
      );
      return this.httpClient.request(req);
    });

    @Effect()
    rostersFetchFfPumpTotals = this.actions$
      .ofType(RostersActions.FETCH_FF_PUMP_TOTALS)
      .switchMap((action: RostersActions.FetchFfPumpTotals) => {
        return this.httpClient.get<FfPumpTotal[]>('/api/ffpumptotals');
      })
      .map((data: FfPumpTotal[]) => {
        console.log(data);
        return {
          type: RostersActions.SET_FF_PUMP_TOTALS,
          payload: data
        };
      });

    @Effect()
    pumpsFetch = this.actions$
      .ofType(RostersActions.FETCH_PUMPS)
      .switchMap((action: RostersActions.FetchPumps) => {
        return this.httpClient.get<Pump[]>('/api/pumps');
      })
      .map((data: Pump[]) => {
        return {
          type: RostersActions.SET_PUMPS,
          payload: data
        };
      });

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
