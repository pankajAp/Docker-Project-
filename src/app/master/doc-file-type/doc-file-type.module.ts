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
import {DocFileTypeRoutingModule} from './doc-file-type-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {AddDocFileTypeComponent} from "./add-doc-file-type/add-doc-file-type.component";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {EditDocFileTypeComponent} from "./edit-doc-file-type/edit-doc-file-type.component";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {AllDocFileTypesComponent} from "./all-doc-file-types/all-doc-file-types.component";
import {FormDialogComponent} from "./all-doc-file-types/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-doc-file-types/dialogs/delete/delete.component";
import {DocFileTypesService} from "./all-doc-file-types/doc-file-types.service";

@NgModule({
  declarations: [
    AllDocFileTypesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    EditDocFileTypeComponent,
    AddDocFileTypeComponent
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
    NgMultiSelectDropDownModule,
    MatDialogModule,
    MatSortModule,
    MatToolbarModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTabsModule,
    MaterialFileInputModule,
    DocFileTypeRoutingModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  providers: [DocFileTypesService],
})
export class DocFileTypeModule {
}
