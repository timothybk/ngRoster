import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
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

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
