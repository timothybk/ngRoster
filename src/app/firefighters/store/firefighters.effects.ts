import { Injectable } from '@angular/core';
import { Qualification } from './../../shared/qualification.model';
import { Firefighter } from './../../shared/firefighter.model';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

import * as firefighterActions from './firefighters.actions';

@Injectable()
export class FirefighterEffects {
  @Effect()
  firefightersFetch = this.actions$
  .ofType(firefighterActions.FETCH_FIREFIGHTERS)
  .switchMap(
    (action: firefighterActions.FetchFirefighters) => {
      return this.http.get('/api/firefighters');
    }
  )
  .map(
    (response: Response) => {
    const firefighters = response.json();
    const transformedFirefighters: Firefighter[] = [];
    for (const firefighter of firefighters) {
      const qualList: Qualification[] = [];
      firefighter.qualifications.forEach(qualification => {
        qualList.push(new Qualification(qualification.name));
      });
      transformedFirefighters.push(new Firefighter(
        firefighter._id,
        firefighter.number,
        firefighter.rank,
        firefighter.name,
        qualList));
    }
    return {
      type: firefighterActions.SET_FIREFIGHTERS,
      payload: transformedFirefighters
    };
  }
);

  constructor(private actions$: Actions,
              private http: Http) {}
}
