import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FirefightersComponent } from './firefighters/firefighters.component';
import { FirefighterEditComponent } from './firefighters/firefighter-edit/firefighter-edit.component';
import { FirefighterListComponent } from './firefighters/firefighter-list/firefighter-list.component';
import { FirefighterItemComponent } from './firefighters/firefighter-list/firefighter-item/firefighter-item.component';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './core/header/header.component';
import { HomeComponent } from './core/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FirefightersComponent,
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
