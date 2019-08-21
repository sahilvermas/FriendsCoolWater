import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginModel, RegisterModel } from './account.model';
import { ApiUrl } from '../helpers/apiUrl';
import { Router } from '@angular/router';
import { Utility } from '../helpers/utility';
import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AccountService {
  apiUrl: ApiUrl;

  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private userId = new BehaviorSubject<string>(this.util.getLocalStorage('userId'));
  private userName = new BehaviorSubject<string>(this.util.getLocalStorage('userName'));
  private userRole = new BehaviorSubject<string>(this.util.getLocalStorage('userRole'));

  constructor(private http: HttpClient, private router: Router, private util: Utility) {
    this.apiUrl = new ApiUrl();
  }

  // Set the initial value for loginStatus to => false.
  checkLoginStatus(): boolean {

    var loginCookie = this.util.getLocalStorage('loginStatus');
    if (loginCookie == '1') {

      const token = this.util.getLocalStorage('JwtToken');

      if (token === null || token === undefined)
        return false;

      const decodedToken = jwt_decode(token);

      if (decodedToken.exp === undefined)
        return false;

      const date = new Date(0);
      // convert the token exp time to UTC
      let tokenExpDate = date.setUTCSeconds(decodedToken.exp);
      if (tokenExpDate.valueOf() > new Date().valueOf())
        return true;
    };
    return false;
  }

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
            this.util.setLocalStorage('loginStatus', '1');

            // save the Jwt Token in the localStorage
            this.util.setLocalStorage('JwtToken', result.token);

            // save the user id in the localStorage
            this.util.setLocalStorage('userId', result.userId);

            // save the username in the localStorage
            this.util.setLocalStorage('userName', result.userName);

            // save the token expiration time in the localStorage
            this.util.setLocalStorage('expiration', result.expiration);

            // save the user's role in the localStorage
            this.util.setLocalStorage('userRole', result.userRole);

            this.userId.next(this.util.getLocalStorage('userId'));
            this.userName.next(this.util.getLocalStorage('userName'));
            this.userRole.next(this.util.getLocalStorage('userRole'));
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
    this.util.setLocalStorage('loginStatus', '0');
    this.util.removeLocalStorage('JwtToken');
    this.util.removeLocalStorage('userId');
    this.util.removeLocalStorage('userName');
    this.util.removeLocalStorage('expiration');
    this.util.removeLocalStorage('userRole');

    this.router.navigate(['/home']);
  }

  // get the current logged user status
  get isUserLoggedIn() {
    return this.loginStatus.asObservable();
  }

  // get the current logged user id
  get loggedUserId() {
    return this.userId.asObservable();
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
