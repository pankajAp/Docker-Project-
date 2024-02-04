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
import {DocFileRoutingModule} from './doc-file-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AddDocFileComponent} from './add-doc-file/add-doc-file.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DocFilesService} from "./all-doc-files/doc-files.service";
import {FormDialogComponent} from "./all-doc-files/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-doc-files/dialogs/delete/delete.component";
import {EditDocFileComponent} from "./edit-doc-file/edit-doc-file.component";
import {AllDocFilesComponent} from "./all-doc-files/all-doc-files.component";

@NgModule({
  declarations: [
    AllDocFilesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddDocFileComponent,
    EditDocFileComponent,
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
    DocFileRoutingModule,
    MatProgressSpinnerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [DocFilesService],
})
export class DocFileModule {
}
