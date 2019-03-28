import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable ,  from } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Qualification } from './../../shared/qualification.model';
import { Firefighter } from './../../shared/firefighter.model';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from "rxjs/operators";

import * as RostersActions from '../../rosters/store/rosters.actions';
import * as firefighterActions from './firefighters.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromFirefighters from '../store/firefighters.reducers';

import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

@Injectable()
export class FirefighterEffects {
  @Effect()
  firefightersFetch = this.actions$.pipe(
    ofType(firefighterActions.FETCH_FIREFIGHTERS),
    switchMap((action: firefighterActions.FetchFirefighters) => {
      return this.httpClient.get<Firefighter>('/api/firefighters');
    }),
    map((data: Firefighter) => {
      return {
        type: firefighterActions.SET_FIREFIGHTERS,
        payload: data
      };
    }));

  @Effect()
  firefightersDelete = this.actions$.pipe(
    ofType(firefighterActions.DELETE_FIREFIGHTER),
    map((action: firefighterActions.DeleteFirefighter) => {
      return action.payload;
    }),
    switchMap(ffNumber => {
      const req = new HttpRequest(
        'POST',
        '/api/deletefirefighter',
        ffNumber,
        {
        reportProgress: true
        }
      );
      return this.httpClient.request(req);
    }),
    map(() => {
      return {
        type: firefighterActions.FETCH_FIREFIGHTERS
      };
    }));

  @Effect()
  firefighterStore = this.actions$.pipe(
    ofType(firefighterActions.STORE_FIREFIGHTER),
    map((action: firefighterActions.StoreFirefighter) => {
      return action.payload;
    }),
    switchMap(data => {
      const req = new HttpRequest(
        'POST',
        '/api/firefighter',
        data,
        {
          reportProgress: true
        }
      );
      return this.httpClient.request(req);
    }),
    map(() => {
      return {
        type: firefighterActions.FETCH_FIREFIGHTERS
      };
    }));

    @Effect()
  firefighterUpdate = this.actions$.pipe(
    ofType(firefighterActions.UPDATEDB_FIREFIGHTER),
    map((action: firefighterActions.UpdateDbFirefighter) => {
      return action.payload;
    }),
    switchMap(data => {
      const req = new HttpRequest(
        'POST',
        '/api/updatefirefighter',
        data,
        {
          reportProgress: true
        }
      );
      return this.httpClient.request(req);
    }),
    map(() => {
      return {
        type: firefighterActions.FETCH_FIREFIGHTERS
      };
    }));

  constructor(
    private actions$: Actions,
    private store: Store<fromApp.AppState>,
    private httpClient: HttpClient
  ) {}
}
