import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from './account-model';
import { ApiUrl } from '../../helpers/ApiUrl';

@Injectable()
export class AccountService {
  apiUrl: ApiUrl;
  
  constructor(private http: HttpClient) {
    this.apiUrl = new ApiUrl();
  }

  onLogin(login: LoginModel) {
  }

}
