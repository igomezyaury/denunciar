import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';


const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home-routing.module').then(
            mod => mod.HomeRoutingModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
