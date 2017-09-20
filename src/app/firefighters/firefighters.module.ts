import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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
    FirefighterDetailComponent,
    FirefighterStartComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FirefightersRoutingModule
  ],
  exports: []
})
export class FirefightersModule {}
