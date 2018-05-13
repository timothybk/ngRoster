import { RoundPipe } from './round.pipe';
import { KeysPipe } from './keys.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatToolbarModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [
    KeysPipe,
    RoundPipe
  ],
  exports: [
    CommonModule,
    NgbModule,
    KeysPipe,
    RoundPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule
  ]
})
export class SharedModule {}
