import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: 'role',
    loadChildren: () =>
      import('./role/role.module').then((m) => m.RoleModule),
  },
  {
    path: 'action',
    loadChildren: () =>
      import('./actions/action.module').then((m) => m.ActionModule),
  },
  {
    path: 'doc-file',
    loadChildren: () =>
      import('./doc-file/doc-file.module').then((m) => m.DocFileModule),
  },
  {
    path: 'doc-type',
    loadChildren: () =>
      import('./doc-type/doc-type.module').then((m) => m.DocTypeModule),
  },
  {
    path: 'doc-file-type',
    loadChildren: () =>
      import('./doc-file-type/doc-file-type.module').then((m) => m.DocFileTypeModule),
  },
  {
    path: 'doc-type',
    loadChildren: () =>
      import('./doc-type/doc-type.module').then((m) => m.DocTypeModule),
  },
  {
    path: 'doc-dt-institute-template',
    loadChildren: () =>
      import('./doc-dt-institute-template/doc-dt-institute-template.module').then((m) => m.DocDtInstituteTemplateModule),
  },
  {
    path: 'doa-amount',
    loadChildren: () =>
      import('./doa-amount/doa-amount.module').then((m) => m.DoaAmountModule),
  },
  {
    path: 'student-document',
    loadChildren: () =>
      import('./student-document/student-document.module').then((m) => m.StudentDocumentModule),
  },
  {
    path: 'fee-category',
    loadChildren: () =>
      import('./fee-category/fee-category.module').then((m) => m.FeeCategoryModule),
  },
  {
    path: 'student-document-fee-category',
    loadChildren: () =>
      import('./student-document-fee-category/student-document-fee-category.module').then((m) => m.StudentDocumentFeeCategoryModule),
  },
  {
    path: 'role-action',
    loadChildren: () =>
      import('./role-action/role-action.module').then((m) => m.RoleActionModule),
  },
  {
    path: 'user-role-action',
    loadChildren: () =>
      import('./user-role-action/user-role-action.module').then((m) => m.UserRoleActionModule),
  },
  {
    path: 'complaint-building',
    loadChildren: () =>
      import('./complaint-building/complaint-building.module').then((m) => m.ComplaintBuildingModule),
  },
  {
    path: 'complaint-office',
    loadChildren: () =>
      import('./complaint-office/complaint-office.module').then((m) => m.ComplaintOfficeModule),
  },
  {
    path: 'template-configuration',
    loadChildren: () =>
      import('./template-configuration/template-configuration.module').then((m) => m.TemplateConfigurationModule),
  },
  {
    path: 'doc-material-status',
    loadChildren: () =>
      import('./doc-material-status/doc-material-status.module').then((m) => m.DocMaterialStatusModule),
  },
  {
    path: 'module',
    loadChildren: () =>
      import('./module/modules.module').then((m) => m.ModulesModule),
  },
  {
    path: 'staff',
    loadChildren: () =>
      import('./staff/staff.module').then((m) => m.StaffModule),
  },
  {
    path: 'sub-module',
    loadChildren: () =>
      import('./sub-module/sub-module.module').then((m) => m.SubModuleModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MasterRoutingModule {
}
