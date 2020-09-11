import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AssistancesComponent } from './components/assistances.component';
import { AssistancesModule } from './assistances.module';
import { AssistanceFormComponent } from './components/assistance-form/assistance-form/assistance-form.component';

const routes: Routes = [
    { path: '', component: AssistancesComponent },
    { 
      path: 'create',
      component: AssistanceFormComponent,
      data: { mode : 'create' } 
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes), AssistancesModule],
    exports: [RouterModule]
  })
  export class AssistancesRoutingModule {}
  