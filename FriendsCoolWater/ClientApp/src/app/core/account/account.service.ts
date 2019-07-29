import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel, RegisterModel } from './account-model';
import { ApiUrl } from '../helpers/ApiUrl';
import { Router } from '@angular/router';

@Injectable()
export class AccountService {
  apiUrl: ApiUrl;

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userName = new BehaviorSubject<string>(localStorage.getItem('userName'));
  private userRole = new BehaviorSubject<string>(localStorage.getItem('userRole'));

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = new ApiUrl();
  }

  // Set the initial value for loginStatus to => false.
  checkLoginStatus(): boolean { return false; }


  Login(loginData: LoginModel) {
    return this.http
      .post<any>(this.apiUrl.loginUrl, loginData)
      .pipe(
        map(result => {
          if (result && result.token) {
            // store user details and Jwt token in the localStorage
            // so other pages can assess the details to make user logged in

            // set the value of loginStatus to true
            this.loginStatus.next(true);

            // save the loginStatus in the localStorage
            localStorage.setItem('loginStatus', '1');

            // save the Jwt Token in the localStorage
            localStorage.setItem('JwtToken', result.token);

            // save the username in the localStorage
            localStorage.setItem('userName', result.userName);

            // save the token expiration time in the localStorage
            localStorage.setItem('expiration', result.expiration);

            // save the user's role in the localStorage
            localStorage.setItem('userRole', result.userRole);
          }

          return result;
        })
      );
  }

  Register(registerData: RegisterModel) {
    return this.http
      .post<any>(this.apiUrl.registerUrl, registerData)
      .pipe(
        map(result => {
          return result;
        }, error => {
          return error;
        })
      );
  }

  onLogout() {
    // clear all the data from the localStorage
    this.loginStatus.next(false);
    localStorage.setItem('loginStatus', '0');
    localStorage.removeItem('JwtToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userRole');

    this.router.navigate(['/login']);
    console.log('User logged out successfully');
  }

  // get the current logged user status
  get isUserLoggedIn() {
    return this.loginStatus.asObservable();
  }

  // get the current logged user's name
  get loggedUserName() {
    return this.userName.asObservable();
  }

  // get the current logged user's role
  get loggedUserRole() {
    return this.userRole.asObservable();
  }

}
