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
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DocTypeRoutingModule} from "./doc-type-routing.module";
import {AddDocTypeComponent} from "./add-doc-type/add-doc-type.component";
import {EditDocTypeComponent} from "./edit-doc-type/edit-doc-type.component";
import {DeleteDialogComponent} from "./all-doc-types/dialogs/delete/delete.component";
import {FormDialogComponent} from "./all-doc-types/dialogs/form-dialog/form-dialog.component";
import {AllDocTypesComponent} from "./all-doc-types/all-doc-types.component";
import {DocTypesService} from "./all-doc-types/doc-types.service";

@NgModule({
  declarations: [
    AllDocTypesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddDocTypeComponent,
    EditDocTypeComponent,
    // AboutStaffComponent,
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
    DocTypeRoutingModule,
    MatProgressSpinnerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [DocTypesService],
})
export class DocTypeModule {
}
