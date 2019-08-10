import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  userRoleStatus: string;
  employee: Employee;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService) { }

  ngOnInit() {
    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result; });
    const employeeId = this.route.snapshot.paramMap.get('id');
    if (employeeId) {
      this.getEmployeeDetails(Number(employeeId));
    }
  }

  getEmployeeDetails(employeeId: number) {

    this.employeeService.getEmployeeById(employeeId)
      .subscribe(result => {
        this.employee = result;
        console.log(result);
      }, error => {
        console.log(error);
      });
  }

}
