import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { HelpdeskQueryRoutingModule } from './helpdesk-query-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AddHelpdeskQueryComponent } from './add-helpdesk-query/add-helpdesk-query.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditHelpdeskQueryComponent } from "./edit-helpdesk-query/edit-helpdesk-query.component";
import { HelpdeskQuerysService } from "./all-helpdesk-querys/helpdesk-querys.service";
import { AllHelpdeskQuerysComponent } from "./all-helpdesk-querys/all-helpdesk-querys.component";
import { FormDialogComponent } from "./all-helpdesk-querys/dialogs/form-dialog/form-dialog.component";
import { DeleteDialogComponent } from "./all-helpdesk-querys/dialogs/delete/delete.component";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {NgSelectModule} from "@ng-select/ng-select";
import {NgxSpinnerModule} from "ngx-spinner";
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {MyHelpdeskQuerysComponent} from "./my-helpdesk-querys/my-helpdesk-querys.component";
import {FormDialogClosureComponent} from "./all-helpdesk-querys/dialogs/form-dialog-closure/form-dialog-closure.component";
import {FormDialogAssigneeComponent} from "./assignee-helpdesk-querys/dialogs/form-dialog-assignee/form-dialog-assignee.component";
import {AssigneeHelpdeskQuerysComponent} from "./assignee-helpdesk-querys/assignee-helpdesk-querys.component";

@NgModule({
  declarations: [
    AllHelpdeskQuerysComponent,
    MyHelpdeskQuerysComponent,
    FormDialogComponent,
    FormDialogAssigneeComponent,
    FormDialogClosureComponent,
    DeleteDialogComponent,
    AddHelpdeskQueryComponent,
    EditHelpdeskQueryComponent,
    AssigneeHelpdeskQuerysComponent
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
    HelpdeskQueryRoutingModule,
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgSelectModule,
    NgxSpinnerModule,
    NgxMatNativeDateModule,
    NgxMatDatetimePickerModule
  ],
  providers: [HelpdeskQuerysService],
})
export class HelpdeskQueryModule { }
