import { FirefighterStartComponent } from './firefighter-start/firefighter-start.component';
import { FirefighterDetailComponent } from './firefighter-detail/firefighter-detail.component';
import { FirefighterEditComponent } from './firefighter-edit/firefighter-edit.component';
import { FirefighterListComponent } from './firefighter-list/firefighter-list.component';
import { FirefightersComponent } from './firefighters.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const firefighterRoutes: Routes = [
  {
    path: 'firefighters', component: FirefightersComponent, children: [
      { path: '', component: FirefighterStartComponent },
      { path: 'new', component: FirefighterEditComponent },
      { path: ':id', component: FirefighterDetailComponent },
      { path: ':id/edit', component: FirefighterEditComponent}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(firefighterRoutes)
  ],
  exports: [RouterModule]
})
export class FirefightersRoutingModule {}
