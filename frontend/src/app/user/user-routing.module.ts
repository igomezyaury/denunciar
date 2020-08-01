import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserModule } from './user.module';

const routes: Routes = [
    { 
      path: 'create',
      component: UserFormComponent,
      data: { mode : 'create' }
    },
    { 
      path: 'edit',
      component: UserFormComponent,
      data: { mode : 'edit' }
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes), UserModule],
    exports: [RouterModule]
  })
  export class UserRoutingModule {}
  