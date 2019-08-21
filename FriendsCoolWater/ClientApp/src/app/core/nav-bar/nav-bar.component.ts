import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Utility } from '../helpers/utility';
import { Observable } from 'rxjs';
import { TeamService } from '../team/team.service';
import { CustomerService } from '../customer/customer.service';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  title = 'Friends Cool Water';
  util = new Utility();
  isUserLoggedIn: boolean;
  loggedUsername: string;
  loggedUserRole: string;

  constructor(
    private accountService: AccountService,
    private teamService: TeamService,
    private employeeService: EmployeeService,
    private customerService: CustomerService) { }

  LoginStatus$: Observable<boolean>;
  LoggedUserName$: Observable<string>;

  ngOnInit() {
    this.LoginStatus$ = this.accountService.isUserLoggedIn;
    this.LoggedUserName$ = this.accountService.loggedUserName;
  }

  onLogout() {
    this.teamService.clearCache();
    this.employeeService.clearCache();
    this.customerService.clearCache();
    this.accountService.onLogout();
  }

}
