import { RosterListComponent } from './roster-list/roster-list.component';
import { RosterPumpsComponent } from './roster-pumps/roster-pumps.component';
import { RosterN2Component } from './roster-n2/roster-n2.component';
import { RosterCreateComponent } from './roster-create/roster-create.component';
import { RosterEditComponent } from './roster-edit/roster-edit.component';
import { RostersComponent } from './rosters.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth-guard.service';

const rostersRoutes: Routes = [
  { path: 'rostering', component: RostersComponent, canActivate: [AuthGuard], children: [
    { path: '', component: RosterCreateComponent },
    { path: 'list', component: RosterListComponent },
    { path: 'new', component: RosterCreateComponent },
    { path: 'n2', component: RosterN2Component },
    { path: 'pumps', component: RosterPumpsComponent},
    { path: ':id', component: RosterEditComponent }
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
