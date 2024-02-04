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
import {DocMaterialStatusRoutingModule} from './doc-material-status-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AddDocMaterialStatusComponent} from './add-doc-material-status/add-doc-material-status.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditDocMaterialStatusComponent} from "./edit-doc-material-status/edit-doc-material-status.component";
import {DocMaterialStatusService} from "./all-doc-material-status/doc-material-status.service";
import {AllDocMaterialStatusComponent} from "./all-doc-material-status/all-doc-material-status.component";
import {FormDialogComponent} from "./all-doc-material-status/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-doc-material-status/dialogs/delete/delete.component";

// import { AddActionRescheduleComponent } from "./add-master-role-schedule/add-master-role-schedule.component";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
@NgModule({
  declarations: [
    AllDocMaterialStatusComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddDocMaterialStatusComponent,
    EditDocMaterialStatusComponent,
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
    DocMaterialStatusRoutingModule,
    MatProgressSpinnerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [DocMaterialStatusService],
})
export class DocMaterialStatusModule {
}
