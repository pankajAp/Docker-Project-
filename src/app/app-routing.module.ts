import {Page404Component} from './authentication/page404/page404.component';
import {AuthLayoutComponent} from './layout/app-layout/auth-layout/auth-layout.component';
import {MainLayoutComponent} from './layout/app-layout/main-layout/main-layout.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './core/guard/auth.guard';
import {Role} from './core/models/role';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [

      {path: '', redirectTo: '/authentication/signin', pathMatch: 'full'},
      {
        path: 'admin',
        // canActivate: [AuthGuard],
        data: {
          role: Role.Admin,
        },
        loadChildren: () =>
          import('./admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'master',
        loadChildren: () =>
          import('./master/master.module').then((m) => m.MasterModule),
      },
      {
        path: 'password',
        loadChildren: () =>
          import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
      },
      {
        path: 'helpdesk-query',
        loadChildren: () =>
          import('./helpdesk-query/helpdesk-query.module').then((m) => m.HelpdeskQueryModule),
      }
    ],
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      ),
  },
  {path: '**', component: Page404Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
