import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddComplaintOfficeComponent} from './add-complaint-office/add-complaint-office.component';
import {AllComplaintOfficesComponent} from './all-complaint-offices/all-complaint-offices.component';
import {EditComplaintOfficeComponent} from './edit-complaint-office/edit-complaint-office.component';

const routes: Routes = [
  {
    path: 'all-complaint-offices',
    component: AllComplaintOfficesComponent
  },
  {
    path: 'add-complaint-office',
    component: AddComplaintOfficeComponent
  },
  {
    path: 'edit-complaint-office',
    component: EditComplaintOfficeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintOfficeRoutingModule {
}
