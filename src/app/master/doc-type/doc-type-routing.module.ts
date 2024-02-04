import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddDocTypeComponent} from './add-doc-type/add-doc-type.component';
import {AllDocTypesComponent} from './all-doc-types/all-doc-types.component';
import {EditDocTypeComponent} from './edit-doc-type/edit-doc-type.component';

const routes: Routes = [
  {
    path: 'all-doc-types',
    component: AllDocTypesComponent
  },
  {
    path: 'add-doc-type',
    component: AddDocTypeComponent
  },
  {
    path: 'edit-doc-type',
    component: EditDocTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocTypeRoutingModule {
}
