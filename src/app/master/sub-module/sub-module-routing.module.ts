import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddSubModuleComponent} from './add-sub-module/add-sub-module.component';
import {AllSubModulesComponent} from './all-sub-modules/all-sub-modules.component';
import {EditSubModuleComponent} from './edit-sub-module/edit-sub-module.component';

const routes: Routes = [
  {
    path: 'all-sub-modules',
    component: AllSubModulesComponent
  },
  {
    path: 'add-sub-module',
    component: AddSubModuleComponent
  },
  {
    path: 'edit-sub-module',
    component: EditSubModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubModuleRoutingModule {
}
