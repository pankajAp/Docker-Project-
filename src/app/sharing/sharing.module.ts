import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { PaginatorModule } from 'primeng/paginator';
// import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';
// import {ConfirmDialogModule} from 'primeng/confirmdialog';
// import {ConfirmationService} from 'primeng/api';
// import { TableModule } from 'primeng/table';
// import { AutoCompleteModule } from 'primeng/autocomplete'
// import { EditorModule } from 'primeng/editor'
// import { CalendarModule } from 'primeng/calendar'


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // PaginatorModule,
    // ToastModule,
    // ConfirmDialogModule,
    // TableModule,
    // AutoCompleteModule,
    // EditorModule,
    // CalendarModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // PaginatorModule,
    // ConfirmDialogModule,
    // TableModule,
    // AutoCompleteModule,
    // EditorModule,
    // CalendarModule
  ],
  providers: [
    // ConfirmationService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharingModule {
}
