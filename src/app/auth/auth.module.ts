import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { RegisterComponent } from './register/register.component';
import { AuthRoutingModule } from './auth.routing';
import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [
    RegisterComponent,
    SigninComponent,
    LogoutComponent
  ]
})
export class AuthModule { }
