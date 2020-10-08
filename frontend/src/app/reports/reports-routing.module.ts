import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportsModule } from './reports.module';
import { DerivationsReportComponent } from './components/derivations-report/derivations-report.component';
import { ViolenceReportComponent } from './components/violence-report/violence-report.component';
import { OriginReportComponent } from './components/origin-report/origin-report.component';

const routes: Routes = [
  { path: 'derivations', component: DerivationsReportComponent },
  { path: 'violence', component: ViolenceReportComponent },
  { path: 'origin', component: OriginReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes), ReportsModule],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
