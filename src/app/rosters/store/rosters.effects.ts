import { of } from 'rxjs/observable/of';
import { Store } from '@ngrx/store';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShiftInstance } from './../shift-instance.model';
import { Pump } from './../pump.model';
import { Firefighter } from './../../shared/firefighter.model'
import { Qualification } from './../../shared/qualification.model';
import { Http, Response } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import * as fromApp from './../../store/app.reducer';
import * as RostersActions from './rosters.actions';


@Injectable()
export class RostersEffects {

  @Effect({dispatch: false})
  rostersStore = this.actions$
    .ofType(RostersActions.UPDATE_N2)
    .switchMap(
      (action: RostersActions.UpdateN2) => {
        const type: string = action.payload.type;
        const id: string = action.payload.id;
        const date: string = action.payload.date;

        const ffN2List = this.db.list('/n2List/' + id + '/' + type);

        return of (ffN2List.push(date));
      }
    );

  constructor(private actions$: Actions,
              private db: AngularFireDatabase,
              private store: Store<fromApp.AppState>) {}
}
