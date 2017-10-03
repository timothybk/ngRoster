import { Observable } from 'rxjs/Rx';
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
import 'rxjs/add/operator/first';

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
      if (payload.type === 'N2') {
        return of(this.db.object('/n2List/' + payload.id)
          .update({
            N2: payload.date
          }));
      } else {
        return of(this.db.object('/n2List/' + payload.id)
          .update({
            PN2: payload.date
          }));
      }
    }
    )
    .map(
    () => {
      return new RostersActions.UpdateN2Success();
    }
    )
    .catch(
    err => {
      return of(new RostersActions.RostersError({ error: err.message }));
    }
    );

  @Effect()
  fetchN2s: Observable<RostersActions.RostersActions> = this.actions$
    .ofType(RostersActions.FETCH_N2S)
    .switchMap(
    (action: RostersActions.FetchN2s) => {
      return this.db
        .list('/n2List', {
          query: {
            orderByChild: 'N2'
          }
        })
        .mergeMap(
        (n2List) => {
          return Observable.forkJoin(
            n2List.map((firefighter) => this.db
              .object('/firefighters/' + firefighter.$key)
              .first()
            ),
            (...values) => {
              return values;
            }
          );
        }
        );
    }
    )
    .map(
    result => {
      return new RostersActions.StoreN2s(result);
    }
    );


  constructor(private actions$: Actions,
    private db: AngularFireDatabase,
    private store: Store<fromApp.AppState>) { }
}
