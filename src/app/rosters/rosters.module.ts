import { RostersRoutingModule } from './rosters-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RosterListComponent } from './roster-list/roster-list.component';
import { RosterItemComponent } from './roster-list/roster-item/roster-item.component';
import { RosterEditComponent } from './roster-edit/roster-edit.component';
import { RosterN2Component } from './roster-n2/roster-n2.component';
import { RosterCreateComponent } from './roster-create/roster-create.component';
import { RostersComponent } from './rosters.component';
import { RosterStartComponent } from './roster-start/roster-start.component';



@NgModule({
  declarations: [
    RosterListComponent,
    RosterItemComponent,
    RosterEditComponent,
    RosterN2Component,
    RosterCreateComponent,
    RostersComponent,
    RosterStartComponent
  ],
  imports: [
    CommonModule,
    RostersRoutingModule
  ]
})
export class RostersModule {}
