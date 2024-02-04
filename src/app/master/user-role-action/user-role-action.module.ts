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
import {AddUserRoleActionComponent} from './add-user-role-action/add-user-role-action.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditUserRoleActionComponent} from "./edit-user-role-action/edit-user-role-action.component";
import {UserRoleActionsService} from "./all-user-role-actions/user-role-actions.service";
import {UserRoleActionRoutingModule} from './user-role-action-routing.module';
import {AllUserRoleActionsComponent} from "./all-user-role-actions/all-user-role-actions.component";
import {FormDialogComponent} from "./all-user-role-actions/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-user-role-actions/dialogs/delete/delete.component";
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {NgSelectModule} from '@ng-select/ng-select';

// import { AddActionRescheduleComponent } from "./add-master-user-role-schedule/add-master-user-role-schedule.component";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
@NgModule({
  declarations: [
    AllUserRoleActionsComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddUserRoleActionComponent,
    EditUserRoleActionComponent,
    // AboutStaffComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    NgSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
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
    UserRoleActionRoutingModule,
    MatProgressSpinnerModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [UserRoleActionsService],
})
export class UserRoleActionModule {
}
