import { Shifts } from './../../shared/shifts.model';
import { Pump } from './../../shared/pump.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';



import * as fromApp from './../../store/app.reducer';
import * as RostersActions from './rosters.actions';
import * as FirefighterActions from '../../firefighters/store/firefighters.actions';
import { ShiftInstance } from '../../shared/shift-instance.model';

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
    rostersFetch = this.actions$
      .ofType(RostersActions.FETCH_SHIFTS)
      .switchMap((action: RostersActions.FetchShifts) => {
        return this.httpClient.get<Shifts[]>('/api/shifts');
      })
      .map((data: Shifts[]) => {
        console.log(data);
        return {
          type: RostersActions.SET_SHIFTS,
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
