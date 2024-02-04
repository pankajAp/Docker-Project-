import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddUserRoleActionComponent} from './add-user-role-action/add-user-role-action.component';
import {AllUserRoleActionsComponent} from './all-user-role-actions/all-user-role-actions.component';
import {EditUserRoleActionComponent} from './edit-user-role-action/edit-user-role-action.component';


const routes: Routes = [
  {
    path: 'all-user-role-actions',
    component: AllUserRoleActionsComponent
  },
  {
    path: 'add-user-role-action',
    component: AddUserRoleActionComponent
  },
  {
    path: 'edit-user-role-action',
    component: EditUserRoleActionComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoleActionRoutingModule {
}
