import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { EmployeeModule } from './employee/employee.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TeamModule } from './team/team.module';
import { RouterModule } from '@angular/router';
import { AccountModule } from './account/account.module';

@NgModule({
  declarations: [NavBarComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    CommonModule, RouterModule, HttpClientModule, AccountModule, TeamModule, EmployeeModule
  ],
  exports: [NavBarComponent, HomeComponent, PageNotFoundComponent, AccountModule, TeamModule, EmployeeModule]
})
export class CoreModule { }
