import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';


import * as fromApp from '../store/app.reducer';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const copiedReq = req.clone({headers: req.headers.set('Authorization', localStorage.getItem('token'))});
      return next.handle(copiedReq);
    } else {
      const copiedReq = req.clone();
      return next.handle(copiedReq);
    }
    // return this.store.select('auth')
    // .take(1)
    //   .switchMap((authState: fromAuth.State) => {
    //     const copiedReq = req.clone({headers: req.headers.set('Authorization', authState.token)});
    //     return next.handle(copiedReq);
    //   });
  }

  constructor(private store: Store<fromApp.AppState>) {}
}
