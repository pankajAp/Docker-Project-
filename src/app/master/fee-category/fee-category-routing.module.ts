import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddFeeCategoryComponent} from './add-fee-category/add-fee-category.component';
import {AllFeeCategorysComponent} from './all-fee-categorys/all-fee-categorys.component';
import {EditFeeCategoryComponent} from './edit-fee-category/edit-fee-category.component';

const routes: Routes = [
  {
    path: 'all-fee-categories',
    component: AllFeeCategorysComponent
  },
  {
    path: 'add-fee-category',
    component: AddFeeCategoryComponent
  },
  {
    path: 'edit-fee-category',
    component: EditFeeCategoryComponent
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
export class FeeCategoryRoutingModule {
}
