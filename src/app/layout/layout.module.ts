import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import {AuthLayoutComponent} from './app-layout/auth-layout/auth-layout.component';
import {MainLayoutComponent} from './app-layout/main-layout/main-layout.component';

@NgModule({
  imports: [CommonModule, NgbModule, MatTabsModule],
  providers: [DatePipe],
  declarations: [AuthLayoutComponent, MainLayoutComponent],
})
export class LayoutModule {
}
