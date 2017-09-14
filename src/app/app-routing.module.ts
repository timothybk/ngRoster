import { FirefightersComponent } from './firefighters/firefighters.component';
import { RostersComponent } from './rosters/rosters.component';
import { HomeComponent } from './core/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes =  [
  { path: '', component: HomeComponent},
  { path: 'rosters', component: RostersComponent},
  { path: 'firefighters', component: FirefightersComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
