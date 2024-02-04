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
import {DoaAmountRoutingModule} from './doa-amount-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AddDoaAmountComponent} from './add-doa-amount/add-doa-amount.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditDoaAmountComponent} from "./edit-doa-amount/edit-doa-amount.component";
import {DoaAmountsService} from "./all-doa-amounts/doa-amounts.service";
import {AllDoaAmountsComponent} from "./all-doa-amounts/all-doa-amounts.component";
import {FormDialogComponent} from "./all-doa-amounts/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-doa-amounts/dialogs/delete/delete.component";

// import { AddActionRescheduleComponent } from "./add-master-role-schedule/add-master-role-schedule.component";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
@NgModule({
  declarations: [
    AllDoaAmountsComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddDoaAmountComponent,
    EditDoaAmountComponent,
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
    DoaAmountRoutingModule,
    MatProgressSpinnerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [DoaAmountsService],
})
export class DoaAmountModule {
}
