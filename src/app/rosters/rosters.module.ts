import { FormsModule } from '@angular/forms';
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
import { RosterN2ListComponent } from './roster-n2/roster-n2-list/roster-n2-list.component';
import { RosterN2ItemComponent } from './roster-n2/roster-n2-list/roster-n2-item/roster-n2-item.component';
import { RosterN2EditComponent } from './roster-n2/roster-n2-edit/roster-n2-edit.component';
import { RosterCreateListComponent } from './roster-create/roster-create-list/roster-create-list.component';
import { RosterCreateListItemComponent } from './roster-create/roster-create-list/roster-create-list-item/roster-create-list-item.component';



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
    RosterHeaderComponent,
    RosterN2ListComponent,
    RosterN2ItemComponent,
    RosterN2EditComponent,
    RosterCreateListComponent,
    RosterCreateListItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RostersRoutingModule
  ],
  providers: [
    RostersService
  ]
})
export class RostersModule {}
