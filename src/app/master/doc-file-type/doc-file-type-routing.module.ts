import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddDocFileTypeComponent} from './add-doc-file-type/add-doc-file-type.component';
import {EditDocFileTypeComponent} from "./edit-doc-file-type/edit-doc-file-type.component";
import {AllDocFileTypesComponent} from "./all-doc-file-types/all-doc-file-types.component";
const routes: Routes = [
  {
    path: 'all-doc-file-types',
    component: AllDocFileTypesComponent
  },
  {
    path: 'add-doc-file-type',
    component: AddDocFileTypeComponent
  },
  {
    path: 'edit-doc-file-type',
    component: EditDocFileTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocFileTypeRoutingModule {
}
