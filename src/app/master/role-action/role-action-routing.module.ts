import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddRoleActionComponent} from './add-role-action/add-role-action.component';
import {AllRoleActionsComponent} from './all-role-actions/all-role-actions.component';
import {EditRoleActionComponent} from './edit-role-action/edit-role-action.component';


// import { AboutStaffComponent } from './about-staff/about-staff.component';
const routes: Routes = [
  {
    path: 'all-role-actions',
    component: AllRoleActionsComponent
  },
  {
    path: 'add-role-action',
    component: AddRoleActionComponent
  },
  {
    path: 'edit-role-action',
    component: EditRoleActionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleActionRoutingModule {
}
