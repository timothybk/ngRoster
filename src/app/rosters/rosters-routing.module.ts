import { RosterN2Component } from './roster-n2/roster-n2.component';
import { RosterCreateComponent } from './roster-create/roster-create.component';
import { RosterStartComponent } from './roster-start/roster-start.component';
import { RosterEditComponent } from './roster-edit/roster-edit.component';
import { RostersComponent } from './rosters.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const rostersRoutes: Routes = [
  { path: '', component: RostersComponent, children: [
    { path: '', component: RosterStartComponent },
    { path: 'new', component: RosterCreateComponent },
    { path: ':id', component: RosterEditComponent },
    { path: 'n2', component: RosterN2Component }
  ]},
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
