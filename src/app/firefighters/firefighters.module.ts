import { AuthGuard } from './../auth/auth-guard.service';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FirefighterItemComponent } from './firefighter-list/firefighter-item/firefighter-item.component';
import { FirefighterListComponent } from './firefighter-list/firefighter-list.component';
import { FirefightersRoutingModule } from './firefighters.routing';
import { SharedModule } from './../shared/shared.module';
import { FirefightersComponent } from './firefighters.component';
import { FirefighterEditComponent } from './firefighter-edit/firefighter-edit.component';
import { FirefighterDetailComponent } from './firefighter-detail/firefighter-detail.component';
import { FirefighterStartComponent } from './firefighter-start/firefighter-start.component';

@NgModule({
  declarations: [
    FirefightersComponent,
    FirefighterEditComponent,
    FirefighterListComponent,
    FirefighterItemComponent,
    FirefighterDetailComponent,
    FirefighterStartComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FirefightersRoutingModule
  ],
  providers: [AuthGuard],
  exports: []
})
export class FirefightersModule {}
