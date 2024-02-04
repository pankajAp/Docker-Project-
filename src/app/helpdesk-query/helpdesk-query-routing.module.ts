import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddHelpdeskQueryComponent} from './add-helpdesk-query/add-helpdesk-query.component';
import {AllHelpdeskQuerysComponent} from './all-helpdesk-querys/all-helpdesk-querys.component';
import {EditHelpdeskQueryComponent} from './edit-helpdesk-query/edit-helpdesk-query.component';
import {MyHelpdeskQuerysComponent} from "./my-helpdesk-querys/my-helpdesk-querys.component";
import {AssigneeHelpdeskQuerysComponent} from "./assignee-helpdesk-querys/assignee-helpdesk-querys.component";

const routes: Routes = [
  {
    path: 'all-helpdesk-querys',
    component: AllHelpdeskQuerysComponent
  },
  {
    path: 'my-helpdesk-querys',
    component: MyHelpdeskQuerysComponent
  },
  {
    path: 'assignee-helpdesk-querys',
    component: AssigneeHelpdeskQuerysComponent
  },
  {
    path: 'add-helpdesk-query',
    component: AddHelpdeskQueryComponent
  },
  {
    path: 'edit-helpdesk-query',
    component: EditHelpdeskQueryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpdeskQueryRoutingModule {
}
