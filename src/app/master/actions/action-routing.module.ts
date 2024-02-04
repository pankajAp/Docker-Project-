import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddActionComponent} from './add-action/add-action.component';
import {AllActionsComponent} from './all-actions/all-actions.component';
import {EditActionComponent} from './edit-action/edit-action.component';

const routes: Routes = [
  {
    path: 'all-actions',
    component: AllActionsComponent
  },
  {
    path: 'add-action',
    component: AddActionComponent
  },
  {
    path: 'edit-action',
    component: EditActionComponent
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
export class ActionRoutingModule {
}
