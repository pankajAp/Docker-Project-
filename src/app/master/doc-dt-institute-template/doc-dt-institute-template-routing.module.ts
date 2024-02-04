import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllDocDtInstituteTemplatesComponent} from "./all-doc-dt-institute-templates/all-doc-dt-institute-templates.component";
import {AddDocDtInstituteTemplateComponent} from "./add-doc-dt-institute-template/add-doc-dt-institute-template.component";
import {EditDocDtInstituteTemplateComponent} from "./edit-doc-dt-institute-template/edit-doc-dt-institute-template.component";
import {ViewDocDtInstituteTemplateComponent} from './view-doc-dt-institute-template/view-doc-dt-institute-template.component';

const routes: Routes = [
  {
    path: 'all-doc-dt-institute-templates',
    component: AllDocDtInstituteTemplatesComponent
  },
  {
    path: 'add-doc-dt-institute-template',
    component: AddDocDtInstituteTemplateComponent
  },
  {
    path: 'edit-doc-dt-institute-template/:dditId',
    component: EditDocDtInstituteTemplateComponent
  },
  {
    path: 'view-doc-dt-institute-template/:dditId',
    component: ViewDocDtInstituteTemplateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocDtInstituteTemplateRoutingModule {
}
