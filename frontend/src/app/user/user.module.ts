import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        UserFormComponent
    ],
    exports: [
        UserFormComponent
    ]
  })
  export class UserModule {}