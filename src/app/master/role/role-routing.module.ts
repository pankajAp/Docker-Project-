import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddRoleComponent} from './add-role/add-role.component';
import {AllRolesComponent} from './all-roles/all-roles.component';
import {EditRoleComponent} from './edit-role/edit-role.component';


// import { AboutStaffComponent } from './about-staff/about-staff.component';
const routes: Routes = [
  {
    path: 'all-roles',
    component: AllRolesComponent
  },
  {
    path: 'add-role',
    component: AddRoleComponent
  },
  {
    path: 'edit-role',
    component: EditRoleComponent
  },
  // {
  //   path: 'about-staff',
  //   component: AboutStaffComponent
  // },
  // {
  //   path: 'all-staff',
  //   component: AllstaffComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {
}
