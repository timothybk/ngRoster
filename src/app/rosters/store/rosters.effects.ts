import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as fromApp from './../../store/app.reducer';
import * as RostersActions from './rosters.actions';

@Injectable()
export class RostersEffects {
  @Effect({ dispatch: false })
  updateN2 = this.actions$
    .ofType(RostersActions.UPDATE_N2)
    .map((action: RostersActions.UpdateN2) => {
      return action.payload;
    })
    .switchMap(data => {
      return this.http.post('/api/nightduty', data).map(response => {
        console.log(response.status);
      });
    });

  constructor(
    private actions$: Actions,
    private http: Http,
    private store: Store<fromApp.AppState>
  ) {}
}
