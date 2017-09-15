import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const authRoutes: Routes = [
  {path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthRoutingModule {}
