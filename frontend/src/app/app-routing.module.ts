import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';
import { LayoutComponent } from './layout/layout/layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/assistances'
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user-routing.module').then(
            mod => mod.UserRoutingModule
          )
      },
      {
        path: 'assistances',
        loadChildren: () =>
          import('./assistances/assistances-routing.module').then(
            mod => mod.AssistancesRoutingModule
          )
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports-routing.module').then(
            mod => mod.ReportsRoutingModule
          )
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authentication/authentication-routing.module').then(
        mod => mod.AuthenticationRoutingModule
      )
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
