import { RoundPipe } from './round.pipe';
import { KeysPipe } from './keys.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    KeysPipe,
    RoundPipe
  ],
  exports: [
    CommonModule,
    NgbModule,
    KeysPipe,
    RoundPipe
  ]
})
export class SharedModule {}
