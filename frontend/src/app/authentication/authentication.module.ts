import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent
    ]
  })
  export class AuthenticationModule {}