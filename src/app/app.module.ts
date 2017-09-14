import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RosterListComponent } from './rosters/roster-list/roster-list.component';
import { RosterItemComponent } from './rosters/roster-list/roster-item/roster-item.component';
import { RosterEditComponent } from './rosters/roster-edit/roster-edit.component';
import { RosterN2Component } from './rosters/roster-n2/roster-n2.component';
import { RosterCreateComponent } from './rosters/roster-create/roster-create.component';
import { FirefightersComponent } from './firefighters/firefighters.component';
import { RostersComponent } from './rosters/rosters.component';
import { FirefighterEditComponent } from './firefighters/firefighter-edit/firefighter-edit.component';
import { FirefighterListComponent } from './firefighters/firefighter-list/firefighter-list.component';
import { FirefighterItemComponent } from './firefighters/firefighter-list/firefighter-item/firefighter-item.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RosterListComponent,
    RosterItemComponent,
    RosterEditComponent,
    RosterN2Component,
    RosterCreateComponent,
    FirefightersComponent,
    RostersComponent,
    FirefighterEditComponent,
    FirefighterListComponent,
    FirefighterItemComponent,
    AuthComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
