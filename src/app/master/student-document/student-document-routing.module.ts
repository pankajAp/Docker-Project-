import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddStudentDocumentComponent} from './add-student-document/add-student-document.component';
import {AllStudentDocumentsComponent} from './all-student-documents/all-student-documents.component';
import {EditStudentDocumentComponent} from './edit-student-document/edit-student-document.component';

const routes: Routes = [
  {
    path: 'all-student-documents',
    component: AllStudentDocumentsComponent
  },
  {
    path: 'add-student-document',
    component: AddStudentDocumentComponent
  },
  {
    path: 'edit-student-document',
    component: EditStudentDocumentComponent
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
export class StudentDocumentRoutingModule {
}
