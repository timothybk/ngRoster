import { CoreModule } from './core/core.module';
import { RostersModule } from './rosters/rosters.module';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirefightersComponent } from './firefighters/firefighters.component';
import { FirefighterEditComponent } from './firefighters/firefighter-edit/firefighter-edit.component';
import { FirefighterListComponent } from './firefighters/firefighter-list/firefighter-list.component';
import { FirefighterItemComponent } from './firefighters/firefighter-list/firefighter-item/firefighter-item.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    FirefightersComponent,
    FirefighterEditComponent,
    FirefighterListComponent,
    FirefighterItemComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RostersModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
