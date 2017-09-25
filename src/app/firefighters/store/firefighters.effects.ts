import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Qualification } from './../../shared/qualification.model';
import { Firefighter } from './../../shared/firefighter.model';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import { of } from 'rxjs/observable/of';

import * as firefighterActions from './firefighters.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromFirefighters from '../store/firefighters.reducers';

@Injectable()
export class FirefighterEffects {

  @Effect({ dispatch: false })
  firefightersStore = this.actions$
    .ofType(firefighterActions.STORE_FIREFIGHTER)
    .switchMap(
    (action: firefighterActions.StoreFirefighter) => {
      const ffs = this.db.list('/firefighters');
      const firefighter = action.payload;
      const ff = {};
      ff['rank'] = firefighter.rank;
      ff['name'] = firefighter.name;
      ff['number'] = firefighter.number;
      ff['qualifications'] = {};
      for (const qual of firefighter.qualifications) {
        if (qual.name === 'rescue') {
          ff['qualifications']['rescue'] = true;
        } else if (qual.name === 'aerial') {
          ff['qualifications']['aerial'] = true;
        } else if (qual.name === 'md') {
          ff['qualifications']['md'] = true;
        }
      }
      return of(
        ffs.push(ff));
    }
    )
    .catch(
    err => of(console.log(err)));

  @Effect()
  firefightersFetch = this.actions$
    .ofType(firefighterActions.FETCH_FIREFIGHTERS)
    .switchMap(
    (action: firefighterActions.FetchFirefighters) => {
      return this.db.list('/firefighters');
    }
    )
    .map(
    (firefighters) => {
      const transformedFirefighters: Firefighter[] = [];
      for (const firefighter of firefighters) {
        const qualArray = [];
        if (firefighter['qualifications']) {
          for (const qualification in firefighter.qualifications) {
            if (firefighter.qualifications.hasOwnProperty(qualification)) {
              qualArray.push(qualification);
            }
          }
        }
        transformedFirefighters.push(new Firefighter(
          firefighter.number,
          firefighter.rank,
          firefighter.name,
          qualArray
        ));
      }
      return {
        type: firefighterActions.SET_FIREFIGHTERS,
        payload: transformedFirefighters
      };
    }
    );

  constructor(private actions$: Actions,
    private db: AngularFireDatabase,
    private store: Store<fromApp.AppState>) { }
}
