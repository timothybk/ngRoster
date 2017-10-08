import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Qualification } from './../../shared/qualification.model';
import { Firefighter } from './../../shared/firefighter.model';
import { Effect, Actions } from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import { of } from 'rxjs/observable/of';

import * as RostersActions from '../../rosters/store/rosters.actions';
import * as firefighterActions from './firefighters.actions';
import * as fromApp from '../../store/app.reducer';
import * as fromFirefighters from '../store/firefighters.reducers';

@Injectable()
export class FirefighterEffects {

  @Effect()
  firefightersFetch = this.actions$
    .ofType(firefighterActions.FETCH_FIREFIGHTERS)
    .switchMap(
    (action: firefighterActions.FetchFirefighters) => {
      const firefighterCollection = this.afs.collection<Firefighter>('firefighters', ref => ref.orderBy('number'));
      return firefighterCollection.snapshotChanges()
        .map(actions => {
          return actions.map(a => {
            console.log(a.type);
            const data = a.payload.doc.data() as Firefighter;
            return { ...data };
          });
        }
        );
    })
    .map(
    data => {
      console.log(data);
      return {
        type: firefighterActions.SET_FIREFIGHTERS,
        payload: data
      };
    }
    );

  @Effect({ dispatch: false })
  firefighterStore = this.actions$
    .ofType(firefighterActions.STORE_FIREFIGHTER)
    .map(
    (action: firefighterActions.StoreFirefighter) => {
      return action.payload;
    }
    )
    .map(
      firefighter => {
        const quals = [];
        firefighter.qualifications.forEach(qual => {
          quals.push(qual.name);
        });
        const newFirefighter = {
          ...firefighter,
          nightDuty: {
            n2: [new Date()],
            pn2: null
          },
        qualifications: quals
        };
        const firefighterCollection = this.afs.collection<Firefighter>('firefighters');
        firefighterCollection.add(newFirefighter);
      }
    );

  constructor(
    private afs: AngularFirestore,
    private actions$: Actions,
    private store: Store<fromApp.AppState>

  ) { }
}

//   @Effect({ dispatch: false })
  //   firefighterStore = this.actions$
  //     .ofType(firefighterActions.STORE_FIREFIGHTER)
  //     .switchMap(
  //     (action: firefighterActions.StoreFirefighter) => {
  //       const ffs = this.db.list('/firefighters');
  //       const firefighter = action.payload;
  //       const ff = {};
  //       ff['rank'] = firefighter.rank;
  //       ff['name'] = firefighter.name;
  //       ff['number'] = firefighter.number;
  //       ff['qualifications'] = {};
  //       for (const qual of firefighter.qualifications) {
  //         if (qual.name === 'rescue') {
  //           ff['qualifications']['rescue'] = true;
  //         } else if (qual.name === 'aerial') {
  //           ff['qualifications']['aerial'] = true;
  //         } else if (qual.name === 'md') {
  //           ff['qualifications']['md'] = true;
  //         }
  //       }
  //       return of(
  //         ffs.push(ff));
  //     }
  //     )
  //     .catch(
  //     err => of(console.log(err)));

  //     @Effect({ dispatch: false })
  //     firefighterUpdateDb = this.actions$
  //       .ofType(firefighterActions.UPDATEDB_FIREFIGHTER)
  //       .switchMap(
  //       (action: firefighterActions.UpdateDbFirefighter) => {
  //         const ffs = this.db.list('/firefighters');
  //         const firefighter = action.payload.firefighter;
  //         const ff = {};
  //         ff['rank'] = firefighter.rank;
  //         ff['name'] = firefighter.name;
  //         ff['number'] = firefighter.number;
  //         ff['qualifications'] = {};
  //         for (const qual of firefighter.qualifications) {
  //           if (qual.name === 'rescue') {
  //             ff['qualifications']['rescue'] = true;
  //           } else if (qual.name === 'aerial') {
  //             ff['qualifications']['aerial'] = true;
  //           } else if (qual.name === 'md') {
  //             ff['qualifications']['md'] = true;
  //           }
  //         }
  //         return of(
  //           ffs.update(action.payload.key, ff));
  //       }
  //       )
  //       .catch(
  //       err => of(console.log(err)));
