import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    AuthRoutingModule
  ]
})
export class AuthModule {}
