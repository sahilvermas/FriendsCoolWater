import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../account-model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.loginModel = new LoginModel('', '');
  }

  onLogin(login: LoginModel): void {
    this.accountService.onLogin(login);
  }

  onClear(login: LoginModel): void {
    login.username = '';
    login.password = '';
  }

}
