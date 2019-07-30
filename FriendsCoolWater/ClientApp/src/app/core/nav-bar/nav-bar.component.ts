import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Utility } from '../helpers/Utility';
import { Observable } from 'rxjs';
import { TeamService } from '../team/team.service';

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

  constructor(private accountService: AccountService, private teamService: TeamService) { }

  LoginStatus$: Observable<boolean>;
  LoggedUserName$: Observable<string>;

  ngOnInit() {
    this.LoginStatus$ = this.accountService.isUserLoggedIn;
    this.LoggedUserName$ = this.accountService.loggedUserName;
  }

  onLogout() {
    this.teamService.clearCache();
    this.accountService.onLogout();
  }

}
