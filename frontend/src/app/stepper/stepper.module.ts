import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';
import { CdkStepperModule } from '@angular/cdk/stepper';

@NgModule({
    imports: [
        CommonModule,
        CdkStepperModule
    ],
    declarations: [
        StepperComponent
    ],
    exports: [
        StepperComponent
    ]
  })
  export class StepperModule {}