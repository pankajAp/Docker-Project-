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
import {RoleRoutingModule} from './role-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AddRoleComponent} from './add-role/add-role.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditRoleComponent} from "./edit-role/edit-role.component";
import {RolesService} from "./all-roles/roles.service";
import {AllRolesComponent} from "./all-roles/all-roles.component";
import {FormDialogComponent} from "./all-roles/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-roles/dialogs/delete/delete.component";

// import { AddRoleRescheduleComponent } from "./add-master-role-schedule/add-master-role-schedule.component";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
@NgModule({
  declarations: [
    AllRolesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddRoleComponent,
    EditRoleComponent,
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
    RoleRoutingModule,
    MatProgressSpinnerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [RolesService],
})
export class RoleModule {
}
