import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
  ],
  exports: [HeaderComponent],
  imports: [CommonModule, AppRoutingModule, RouterModule, SidebarModule.forRoot()],
  providers: []
})
export class LayoutModule { }
