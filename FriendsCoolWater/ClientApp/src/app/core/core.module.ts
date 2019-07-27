import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { TeamModule } from '../team/team.module';
import { EmployeeModule } from '../employee/employee.module';

@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule, TeamModule, EmployeeModule
  ],
  exports: [NavBarComponent, TeamModule, EmployeeModule]
})
export class CoreModule { }
