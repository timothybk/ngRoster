import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { FirefightersModule } from './firefighters/firefighters.module';
import { CoreModule } from './core/core.module';
import { RostersModule } from './rosters/rosters.module';
import { AppRoutingModule } from './app.routing';
import { firefightersReducer } from './firefighters/store/firefighters.reducers';


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
    StoreModule.forRoot({firefighters: firefightersReducer}),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
