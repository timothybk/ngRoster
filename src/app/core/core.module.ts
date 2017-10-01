import { SharedModule } from './../shared/shared.module';
import { CommonModule } from '@angular/common';
import { AuthService } from './../auth/auth.service';
import { AppRoutingModule } from './../app.routing';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports: [
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    AuthService
  ]
})
export class CoreModule {}
