import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddDocFileComponent} from './add-doc-file/add-doc-file.component';
import {AllDocFilesComponent} from './all-doc-files/all-doc-files.component';
import {EditDocFileComponent} from './edit-doc-file/edit-doc-file.component';

const routes: Routes = [
  {
    path: 'all-doc-files',
    component: AllDocFilesComponent
  },
  {
    path: 'add-doc-file',
    component: AddDocFileComponent
  },
  {
    path: 'edit-doc-file',
    component: EditDocFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocFileRoutingModule {
}
