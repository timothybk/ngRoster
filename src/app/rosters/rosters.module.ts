import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RostersService } from './rosters.service';
import { RostersRoutingModule } from './rosters.routing';
import { SharedModule } from './../shared/shared.module';
import { RosterListComponent } from './roster-list/roster-list.component';
import { RosterItemComponent } from './roster-list/roster-item/roster-item.component';
import { RosterEditComponent } from './roster-edit/roster-edit.component';
import { RosterN2Component } from './roster-n2/roster-n2.component';
import { RosterCreateComponent } from './roster-create/roster-create.component';
import { RostersComponent } from './rosters.component';
import { RosterStartComponent } from './roster-start/roster-start.component';
import { RosterPumpsComponent } from './roster-pumps/roster-pumps.component';
import { RosterHeaderComponent } from './roster-header/roster-header.component';



@NgModule({
  declarations: [
    RosterListComponent,
    RosterItemComponent,
    RosterEditComponent,
    RosterN2Component,
    RosterCreateComponent,
    RostersComponent,
    RosterStartComponent,
    RosterPumpsComponent,
    RosterHeaderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RostersRoutingModule
  ],
  providers: [
    RostersService
  ]
})
export class RostersModule {}
