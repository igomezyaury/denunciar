import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportsModule } from './reports.module';
import { DerivationsReportComponent } from './components/derivations-report/derivations-report.component';

const routes: Routes = [
  { path: 'derivations', component: DerivationsReportComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReportsModule],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
