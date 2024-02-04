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
import {SubModuleRoutingModule} from './sub-module-routing.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AddSubModuleComponent} from './add-sub-module/add-sub-module.component';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {EditSubModuleComponent} from "./edit-sub-module/edit-sub-module.component";
import {SubModuleService} from "./all-sub-modules/sub-module.service";
import {AllSubModulesComponent} from "./all-sub-modules/all-sub-modules.component";
import {FormDialogComponent} from "./all-sub-modules/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./all-sub-modules/dialogs/delete/delete.component";

// import { AddActionRescheduleComponent } from "./add-master-role-schedule/add-master-role-schedule.component";
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from "ng-pick-datetime";
@NgModule({
  declarations: [
    AllSubModulesComponent,
    FormDialogComponent,
    DeleteDialogComponent,
    AddSubModuleComponent,
    EditSubModuleComponent,
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
    SubModuleRoutingModule,
    MatProgressSpinnerModule,
    // OwlDateTimeModule,
    // OwlNativeDateTimeModule,
  ],
  providers: [SubModuleService],
})
export class SubModuleModule {
}
