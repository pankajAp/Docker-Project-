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
import {AddStudentDocumentFeeCategoryComponent} from './add-student-document-fee-category/add-student-document-fee-category.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditStudentDocumentFeeCategoryComponent} from "./edit-student-document-fee-category/edit-student-document-fee-category.component";
import {StudentDocumentFeeCategorysService} from "./all-student-document-fee-categorys/student-document-fee-categorys.service";
import {StudentDocumentFeeCategoryRoutingModule} from './student-document-fee-category-routing.module';
import {AllStudentDocumentFeeCategorysComponent} from "./all-student-document-fee-categorys/all-student-document-fee-categorys.component";
import {FormDialogComponent} from "./all-student-document-fee-categorys/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-student-document-fee-categorys/dialogs/delete/delete.component";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
// import { AddActionRescheduleComponent } from "./add-master-role-schedule/add-master-role-schedule.component";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
@NgModule({
  declarations: [
    AllStudentDocumentFeeCategorysComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddStudentDocumentFeeCategoryComponent,
    EditStudentDocumentFeeCategoryComponent,
    // AboutStaffComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgMultiSelectDropDownModule,
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
    StudentDocumentFeeCategoryRoutingModule,
    MatProgressSpinnerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [StudentDocumentFeeCategorysService],
})
export class StudentDocumentFeeCategoryModule {
}
