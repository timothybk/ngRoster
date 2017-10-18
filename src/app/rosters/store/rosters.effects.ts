import { Ranking } from './../ranking.model';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
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
  fetchN2s = this.actions$
    .ofType(RostersActions.FETCH_N2S)
    .switchMap(
    (action: RostersActions.FetchN2s) => {
      const firefighterCollection = this.afs
        .collection<Firefighter>('firefighters', ref => ref.orderBy('nightDuty.n2'));
      return firefighterCollection.snapshotChanges()
        .map(
        actions => {
          return actions.map(
            a => {
              const id = a.payload.doc.id;
              const data = a.payload.doc.data() as Firefighter;
              return { id, ...data };
            });
        });
    })
    .map(
    data => {
      return {
        type: RostersActions.STORE_N2S,
        payload: data
      };
    }
    );

  @Effect({ dispatch: false })
  updateN2 = this.actions$
    .ofType(RostersActions.UPDATE_N2)
    .map(
    (action: RostersActions.UpdateN2) => {
      return action.payload;
    }
    )
    .map(
    data => {
      console.log(data);
      this.afs.collection('firefighters').doc(data.id).update({
        'nightDuty.n2': data.date
      });
    }
    );

  @Effect()
  fetchByFlyer = this.actions$
    .ofType(RostersActions.FETCH_BY_FLYER)
    .switchMap(
    (action: RostersActions.FetchByFlyer) => {
      const rankingCollection = this.afs.collection<Ranking>('shifts', ref => ref.orderBy('f1'));
      return rankingCollection.snapshotChanges()
        .map(
        actions => {
          return actions.map(
            a => {
              const data = a.payload.doc.data() as Ranking;
              return { ...data };
            });
        }
        );
    }
    )
    .map(
    result => {
      return {
        type: RostersActions.STORE_FLYER_RANKING,
        payload: result
      };
    }
    );

  @Effect()
  fetchShifts = this.actions$
    .ofType(RostersActions.FETCH_SHIFTSINSTS)
    .switchMap(
    (action: RostersActions.FetchShiftsInsts) => {
      return this.http.get('api/shift-list')
        .map(
        response => {
          const firefighters: ShiftInstance[] = response.json();
          return firefighters;
        }
        );
    })
    .map(
    data => {
      console.log(data);
      return {
        type: RostersActions.SET_SHIFTSINSTS,
        payload: data
      };
    }
    );



  constructor(private actions$: Actions,
    private afs: AngularFirestore,
    private http: Http,
    private store: Store<fromApp.AppState>) { }
}
