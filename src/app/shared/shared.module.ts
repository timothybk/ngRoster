import { KeysPipe } from './keys.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    KeysPipe
  ],
  exports: [
    CommonModule,
    NgbModule,
    KeysPipe
  ]
})
export class SharedModule {}
