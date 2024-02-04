import {NgModule} from '@angular/core';

import {CoreModule} from './core/core.module';
import {SharedModule} from './shared/shared.module';

import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {PageLoaderComponent} from './layout/page-loader/page-loader.component';
import {SidebarComponent} from './layout/sidebar/sidebar.component';
import {RightSidebarComponent} from './layout/right-sidebar/right-sidebar.component';
import {AuthLayoutComponent} from './layout/app-layout/auth-layout/auth-layout.component';
import {MainLayoutComponent} from './layout/app-layout/main-layout/main-layout.component';
import {fakeBackendProvider} from './core/interceptor/fake-backend';
import {ErrorInterceptor} from './core/interceptor/error.interceptor';
import {JwtInterceptor} from './core/interceptor/jwt.interceptor';
import {LocationStrategy, HashLocationStrategy, DatePipe, CommonModule} from '@angular/common';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ToastrModule} from 'ngx-toastr';


import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
import {ClickOutsideModule} from 'ng-click-outside';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {GlobalFile} from "./globalfile";
import {Globalpath} from './sharing/globalpath';
import {MatIconModule} from "@angular/material/icon";
import {MasterRoutingModule} from './master/master-routing.module';
import {MAT_DATE_LOCALE} from '@angular/material/core';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageLoaderComponent,
    SidebarComponent,
    RightSidebarComponent,
    AuthLayoutComponent,
    MainLayoutComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule,
    ClickOutsideModule,
    MatIconModule,
    // core & shared
    CoreModule,
    SharedModule,
    MasterRoutingModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    fakeBackendProvider, GlobalFile, Globalpath, DatePipe,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    // { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    // { provide: ErrorHandler, useClass: AppErrorHandler}
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
