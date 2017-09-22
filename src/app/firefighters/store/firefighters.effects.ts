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

  @Effect({dispatch: false})
  firefightersStore = this.actions$
  .ofType(firefighterActions.STORE_FIREFIGHTERS)
  .withLatestFrom(this.store.select('firefighters'))
  .switchMap(
    ([action, state]) => {
      return of (this.db.list('/firefighters')
      .push(state.firefighters));
    }
  )
  .catch(
    err => of (console.log(err)));

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
      console.log(firefighters);
      for (const firefighter of firefighters) {
        if (!firefighter['qualifications']) {
          firefighter['qualifications'] = [];
        }
      }
    return {
      type: firefighterActions.SET_FIREFIGHTERS,
      payload: firefighters
    };
  }
);

  constructor(private actions$: Actions,
              private db: AngularFireDatabase,
              private store: Store<fromApp.AppState>) { }
}
