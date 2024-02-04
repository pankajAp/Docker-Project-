import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSortModule} from '@angular/material/sort';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';
import {DocDtInstituteTemplateRoutingModule} from './doc-dt-institute-template-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {FormDialogComponent} from "./all-doc-dt-institute-templates/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-doc-dt-institute-templates/dialogs/delete/delete.component";
import {AllDocDtInstituteTemplatesComponent} from "./all-doc-dt-institute-templates/all-doc-dt-institute-templates.component";
import {EditDocDtInstituteTemplateComponent} from "./edit-doc-dt-institute-template/edit-doc-dt-institute-template.component";
import {AddDocDtInstituteTemplateComponent} from "./add-doc-dt-institute-template/add-doc-dt-institute-template.component";
import {ViewDocDtInstituteTemplateComponent} from "./view-doc-dt-institute-template/view-doc-dt-institute-template.component";
import {DocDtInstituteTemplateService} from "./all-doc-dt-institute-templates/doc-dt-institute-template.service";

@NgModule({
  declarations: [
    AllDocDtInstituteTemplatesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    EditDocDtInstituteTemplateComponent,
    // AboutStaffComponent,
    AddDocDtInstituteTemplateComponent,
    ViewDocDtInstituteTemplateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTabsModule,
    MaterialFileInputModule,
    DocDtInstituteTemplateRoutingModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [DocDtInstituteTemplateService],
})
export class DocDtInstituteTemplateModule {
}
