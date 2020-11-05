import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistancesComponent } from './components/assistances.component';
import { RouterModule } from '@angular/router';
import { AssistancesService } from './assistances.service';
import { AssistanceFormComponent } from './components/assistance-form/assistance-form/assistance-form.component';
import { StepperModule } from '../stepper/stepper.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgSelect2Module } from 'ng-select2';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';

import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        StepperModule,
        ReactiveFormsModule,
        CdkStepperModule,
        NgSelect2Module,
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatTimepickerModule
    ],
    declarations: [
        AssistancesComponent,
        AssistanceFormComponent
    ],
    exports: [
        AssistancesComponent
    ],
    providers: [
        AssistancesService
    ]
})
export class AssistancesModule { }