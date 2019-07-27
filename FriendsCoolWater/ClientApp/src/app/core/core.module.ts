import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TeamModule } from '../team/team.module';
import { EmployeeModule } from '../employee/employee.module';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { AccountModule } from '../account/account.module';

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule, AccountModule, TeamModule, EmployeeModule
  ],
  exports: [NavBarComponent, AccountModule, TeamModule, EmployeeModule]
})
export class CoreModule { }
