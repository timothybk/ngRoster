import { RoundPipe } from './round.pipe';
import { KeysPipe } from './keys.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatMenuModule,
        MatExpansionModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTabsModule,
        MatStepperModule,
        MatSelectModule,
        MatCardModule,
        MatListModule
      } from '@angular/material';

@NgModule({
  declarations: [
    KeysPipe,
    RoundPipe
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    KeysPipe,
    RoundPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatMenuModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatStepperModule,
    MatSelectModule,
    MatCardModule,
    MatListModule
  ]
})
export class SharedModule {}
