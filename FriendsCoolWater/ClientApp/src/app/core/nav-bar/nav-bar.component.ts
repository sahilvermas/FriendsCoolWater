import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { Utility } from '../helpers/Utility';

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

  constructor(private accountService: AccountService) { }

  ngOnInit() {
    this.isUserLoggedIn = parseInt(this.util.getLocalStorage('loginStatus')) !== 0;

    console.log(this.isUserLoggedIn);
  }

  onLogout() {
    this.accountService.onLogout();
  }

}
