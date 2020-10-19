import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DerivationsReportComponent } from './components/derivations-report/derivations-report.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssistancesModule } from '../assistances/assistances.module';
import { ViolenceReportComponent } from './components/violence-report/violence-report.component';
import { ReportComponent } from './components/report/report.component';
import { OriginReportComponent } from './components/origin-report/origin-report.component';
import { VulnerablePopulationReportComponent } from './components/vulnerable-population-report/vulnerable-population-report.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ChartsModule,
        ReactiveFormsModule,
        FormsModule,
        AssistancesModule
    ],
    declarations: [
        DerivationsReportComponent,
        ViolenceReportComponent,
        ReportComponent,
        OriginReportComponent,
        VulnerablePopulationReportComponent
    ]
})
export class ReportsModule { }