import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { FirefighterEffects } from './firefighters/store/firefighters.effects';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { reducers } from './store/app.reducer';
import { AppComponent } from './app.component';
import { FirefightersModule } from './firefighters/firefighters.module';
import { CoreModule } from './core/core.module';
import { RostersModule } from './rosters/rosters.module';
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RostersModule,
    FirefightersModule,
    CoreModule,
    AuthModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([FirefighterEffects]),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
