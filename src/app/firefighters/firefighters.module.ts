import { SharedModule } from './../shared/shared.module';
import { FirefightersRoutingModule } from './firefighters-routing.module';
import { NgModule } from '@angular/core';

import { FirefightersComponent } from './firefighters.component';
import { FirefighterListComponent } from './firefighter-list/firefighter-list.component';
import { FirefighterItemComponent } from './firefighter-list/firefighter-item/firefighter-item.component';
import { FirefighterEditComponent } from './firefighter-edit/firefighter-edit.component';
import { FirefighterDetailComponent } from './firefighter-detail/firefighter-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  ]
})
export class FirefightersModule {}
