import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddModuleComponent} from './add-module/add-module.component';
import {AllModulesComponent} from './all-modules/all-modules.component';
import {EditModuleComponent} from './edit-module/edit-module.component';

const routes: Routes = [
  {
    path: 'all-modules',
    component: AllModulesComponent
  },
  {
    path: 'add-module',
    component: AddModuleComponent
  },
  {
    path: 'edit-module',
    component: EditModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule {
}
