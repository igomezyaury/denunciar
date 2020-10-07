import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DerivationsReportComponent } from './components/derivations-report/derivations-report.component';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssistancesModule } from '../assistances/assistances.module';


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
        DerivationsReportComponent
    ]
})
export class ReportsModule { }