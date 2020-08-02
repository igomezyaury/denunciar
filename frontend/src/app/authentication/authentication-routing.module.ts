import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { AuthenticationModule } from './authentication.module';

const routes: Routes = [
    { path: 'login', component: LoginComponent }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes), AuthenticationModule],
    exports: [RouterModule]
  })
  export class AuthenticationRoutingModule {}
  