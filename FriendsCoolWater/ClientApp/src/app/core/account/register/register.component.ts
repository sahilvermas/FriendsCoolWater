import { Component, OnInit } from '@angular/core';
import { RegisterModel } from '../account-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register: RegisterModel;
  constructor() { }

  ngOnInit() {
    this.register = new RegisterModel('', '', '', '');
  }


  onRegister(registerData: RegisterModel): void {
    console.log(registerData);
  }

  onClear(registerData: RegisterModel): void {
    registerData.email = '';
    registerData.username = '';
    registerData.password = '';
    registerData.confirmPassword = '';
  }
}
