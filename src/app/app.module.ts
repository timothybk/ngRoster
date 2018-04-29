import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FirefighterEffects } from './firefighters/store/firefighters.effects';
import { RostersEffects } from './rosters/store/rosters.effects';
import { SharedModule } from './shared/shared.module';
import { reducers } from './store/app.reducer';
import { AppComponent } from './app.component';
import { FirefightersModule } from './firefighters/firefighters.module';
import { CoreModule } from './core/core.module';
import { RostersModule } from './rosters/rosters.module';
import { AppRoutingModule } from './app.routing';
import { environment } from './../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RostersModule,
    FirefightersModule,
    CoreModule,
    SharedModule,
    NgbModule.forRoot(),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([FirefighterEffects, RostersEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
