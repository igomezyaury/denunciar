import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
  })
  export class HomeModule {}