import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddDocMaterialStatusComponent} from './add-doc-material-status/add-doc-material-status.component';
import {AllDocMaterialStatusComponent} from './all-doc-material-status/all-doc-material-status.component';
import {EditDocMaterialStatusComponent} from './edit-doc-material-status/edit-doc-material-status.component';

const routes: Routes = [
  {
    path: 'all-doc-material-status',
    component: AllDocMaterialStatusComponent
  },
  {
    path: 'add-doc-material-status',
    component: AddDocMaterialStatusComponent
  },
  {
    path: 'edit-doc-material-status',
    component: EditDocMaterialStatusComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocMaterialStatusRoutingModule {
}
