import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // =====using localStorage====
    if (localStorage.getItem('token') !== null){
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }

    // =====using store=======
    // return this.store.select('auth')
    //   .take(1)
    //   .map((authState: fromAuth.State) => {
    //     if (authState.isAuthenticated) {
    //       return true;
    //     } else {
    //       this.router.navigate(['/signin']);
    //     }
    //   });
  }
}
