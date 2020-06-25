import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent, SidebarComponent],
  imports: [CommonModule, RouterModule]
})
export class LayoutModule { }
