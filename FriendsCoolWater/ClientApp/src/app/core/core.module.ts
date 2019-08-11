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
import { AccessDeniedComponent } from './errors/access-denied/access-denied.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CustomerModule } from './customer/customer.module';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    AboutUsComponent,
    ContactUsComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    AccountModule,
    TeamModule,
    EmployeeModule,
    CustomerModule,
    ModalModule.forRoot()
  ],
  exports: [
    NavBarComponent,
    HomeComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    AccountModule,
    TeamModule,
    EmployeeModule,
    CustomerModule],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }]
})
export class CoreModule { }
