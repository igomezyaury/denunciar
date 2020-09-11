import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssistancesComponent } from './components/assistances.component';
import { RouterModule } from '@angular/router';
import { AssistancesService } from './assistances.service';
import { AssistanceFormComponent } from './components/assistance-form/assistance-form/assistance-form.component';
import { StepperModule } from '../stepper/stepper.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkStepperModule } from '@angular/cdk/stepper';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        StepperModule,
        ReactiveFormsModule,
        CdkStepperModule
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
  export class AssistancesModule {}