import { RostersComponent } from './rosters.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const rostersRoutes: Routes = [
  { path: 'rosters', component: RostersComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(rostersRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class RostersRoutingModule {}
