import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmployeeModule } from './employee/employee.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TeamModule } from './team/team.module';
import { RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuardService } from './guards/auth-guard.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomerModule } from './customer/customer.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './shared/toast.service';
import { LoaderService } from './shared/loader.service';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    ContactUsComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AccountModule,
    TeamModule,
    EmployeeModule,
    CustomerModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    ModalModule.forRoot()
  ],
  exports: [
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    AccountModule,
    TeamModule,
    NgxSpinnerModule,
    EmployeeModule,
    CustomerModule],
  providers: [
    AuthGuardService, ToastService, LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }]
})
export class CoreModule { }
