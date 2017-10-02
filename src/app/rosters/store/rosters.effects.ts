import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShiftInstance } from './../shift-instance.model';
import { Pump } from './../pump.model';
import { Firefighter } from './../../shared/firefighter.model';
import { Qualification } from './../../shared/qualification.model';
import { Http, Response } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import * as fromApp from './../../store/app.reducer';
import * as RostersActions from './rosters.actions';


@Injectable()
export class RostersEffects {

  @Effect()
  rosterN2Update: Observable<RostersActions.RostersActions> = this.actions$
  .ofType(RostersActions.UPDATE_N2)
  .map(
    (action: RostersActions.UpdateN2) => {
      return action.payload;
    }
  )
  .mergeMap(
    payload => {
      return of(this.db.object('/n2List/' + payload.id)
                .update({
                  N2: payload.date
                }));
    }
  )
  .map(
    () => {
      return new RostersActions.UpdateN2Success();
    }
  )
  .catch(
    err => {
      return of(new RostersActions.RostersError({error: err.message}));
    }
  );

  constructor(private actions$: Actions,
              private db: AngularFireDatabase,
              private store: Store<fromApp.AppState>) {}
}
