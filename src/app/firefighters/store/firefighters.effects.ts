import { FfApiResponse } from './../../shared/ff-api-response.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Qualification } from './../../shared/qualification.model';
import { Firefighter } from './../../shared/firefighter.model';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { from } from 'rxjs/observable/from';

import * as RostersActions from '../../rosters/store/rosters.actions';
import * as firefighterActions from './firefighters.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromFirefighters from '../store/firefighters.reducers';

@Injectable()
export class FirefighterEffects {
  @Effect()
  firefightersFetch = this.actions$
    .ofType(firefighterActions.FETCH_FIREFIGHTERS)
    .switchMap((action: firefighterActions.FetchFirefighters) => {
      return this.httpClient.get<FfApiResponse>('/api/firefighters');
    })
    .mergeMap(
      (data: FfApiResponse) => {
      return [
        {
          type: firefighterActions.SET_FIREFIGHTERS,
          payload: data.firefighters
        },
        {
          type: firefighterActions.STORE_AVERAGES,
          payload: data.averages
        }
      ];
    });

  @Effect({ dispatch: false })
  firefighterStore = this.actions$
    .ofType(firefighterActions.STORE_FIREFIGHTER)
    .map((action: firefighterActions.StoreFirefighter) => {
      return action.payload;
    })
    .map(firefighter => {
      const firefighterCollection = this.afs.collection<Firefighter>(
        'firefighters'
      );
      firefighterCollection.add(firefighter);
    });

  constructor(
    private afs: AngularFirestore,
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private httpClient: HttpClient
  ) {}
}
