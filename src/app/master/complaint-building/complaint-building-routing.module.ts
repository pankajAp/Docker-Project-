import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddComplaintBuildingComponent} from './add-complaint-building/add-complaint-building.component';
import {AllComplaintBuildingsComponent} from './all-complaint-buildings/all-complaint-buildings.component';
import {EditComplaintBuildingComponent} from './edit-complaint-building/edit-complaint-building.component';


// import { AboutStaffComponent } from './about-staff/about-staff.component';
const routes: Routes = [
  {
    path: 'all-complaint-buildings',
    component: AllComplaintBuildingsComponent
  },
  {
    path: 'add-complaint-building',
    component: AddComplaintBuildingComponent
  },
  {
    path: 'edit-complaint-building',
    component: EditComplaintBuildingComponent
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
export class ComplaintBuildingRoutingModule {
}
