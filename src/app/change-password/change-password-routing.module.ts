import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EditChangePasswordComponent} from "./edit-change-password/edit-change-password.component";

const routes: Routes = [
  {
    path: 'edit-change-password',
    component: EditChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule {
}
