import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { TeamService } from '../team/team.service';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { EmployeeService } from './employee.service';



@NgModule({
  declarations: [EmployeeListComponent, EmployeeDetailsComponent],
  imports: [CommonModule, EmployeeRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  exports: [EmployeeListComponent, EmployeeDetailsComponent],
  providers: [TeamService, EmployeeService]
})
export class EmployeeModule { }
