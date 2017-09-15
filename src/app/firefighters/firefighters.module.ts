import { FirefightersRoutingModule } from './firefighters-routing.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FirefightersComponent } from './firefighters.component';
import { FirefighterListComponent } from './firefighter-list/firefighter-list.component';
import { FirefighterItemComponent } from './firefighter-list/firefighter-item/firefighter-item.component';
import { FirefighterEditComponent } from './firefighter-edit/firefighter-edit.component';

@NgModule({
  declarations: [
    FirefightersComponent,
    FirefighterEditComponent,
    FirefighterListComponent,
    FirefighterItemComponent
  ],
  imports: [
    CommonModule,
    FirefightersRoutingModule
  ]
})
export class FirefightersModule {}
