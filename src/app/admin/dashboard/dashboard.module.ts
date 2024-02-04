import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MainComponent} from './main/main.component';
import {Dashboard2Component} from './dashboard2/dashboard2.component';
import {NgxEchartsModule} from 'ngx-echarts';
import {NgApexchartsModule} from 'ng-apexcharts';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {FormDialogComponent} from "./main/dialogs/form-dialog/form-dialog.component";
import {DeleteDialogComponent} from "./main/dialogs/delete/delete.component";
import {MainService} from "./main/main.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {OwlDateTimeModule, OwlNativeDateTimeModule} from "ng-pick-datetime";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSelectModule} from "@angular/material/select";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatTabsModule} from "@angular/material/tabs";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MaterialFileInputModule} from "ngx-material-file-input";

@NgModule({
  declarations: [
    FormDialogComponent,
    DeleteDialogComponent,
    MainComponent,
    Dashboard2Component
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    PerfectScrollbarModule,
    NgApexchartsModule,
    ChartsModule,
    MatMenuModule,
    MatFormFieldModule,
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
    MatProgressSpinnerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  providers: [
    MainService
  ]
})
export class DashboardModule {
}
