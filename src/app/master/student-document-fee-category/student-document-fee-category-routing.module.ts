import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddStudentDocumentFeeCategoryComponent} from './add-student-document-fee-category/add-student-document-fee-category.component';
import {AllStudentDocumentFeeCategorysComponent} from './all-student-document-fee-categorys/all-student-document-fee-categorys.component';
import {EditStudentDocumentFeeCategoryComponent} from './edit-student-document-fee-category/edit-student-document-fee-category.component';


// import { AboutStaffComponent } from './about-staff/about-staff.component';
const routes: Routes = [
  {
    path: 'all-student-document-fee-categorys',
    component: AllStudentDocumentFeeCategorysComponent
  },
  {
    path: 'add-student-document-fee-category',
    component: AddStudentDocumentFeeCategoryComponent
  },
  {
    path: 'edit-student-document-fee-category',
    component: EditStudentDocumentFeeCategoryComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentDocumentFeeCategoryRoutingModule {
}
