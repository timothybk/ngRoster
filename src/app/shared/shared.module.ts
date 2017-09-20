import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DropdownDirective } from './dropdown.directive';
import { FirefighterListComponent } from '../firefighters/firefighter-list/firefighter-list.component';
import { FirefighterItemComponent } from '../firefighters/firefighter-list/firefighter-item/firefighter-item.component';

@NgModule({
  declarations: [
    DropdownDirective,
    FirefighterListComponent,
    FirefighterItemComponent
  ],
  exports: [
    CommonModule,
    DropdownDirective,
    FirefighterListComponent,
    FirefighterItemComponent
  ]
})
export class SharedModule {}
