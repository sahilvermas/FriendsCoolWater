import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RegisterModel } from '../account-model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private modalService: BsModalService
  ) { }

  // Properties
  registerForm: FormGroup;
  username: FormControl;
  password: FormControl;
  confirmPassword: FormControl;
  email: FormControl;
  modalRef: BsModalRef;
  errorList: string[];
  modalMessage: string;

  @ViewChild('template', { static: false }) modal: TemplateRef<any>;

  ngOnInit() {
    this.username = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    this.password = new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(5)]);
    this.confirmPassword = new FormControl('', [Validators.required, this.MustMatch(this.password)]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.errorList = [];


    this.registerForm = this.fb.group(
      {
        'username': this.username,
        'password': this.password,
        'confirmPassword': this.confirmPassword,
        'email': this.email,
      });
  }



  onRegister(): void {

    let data = this.registerForm.value;
    let userData = new RegisterModel(data.email, data.username, data.password);
    this.accountService
      .Register(userData)
      .subscribe(result => {
        this.router.navigate(['/login'])
      }, error => {
        this.errorList = [];

        for (var i = 0; i < error.error.value.length; i++) {
          this.errorList.push(error.error.value[i]);
        }

        this.modalMessage = "Your Registration Was Unsuccessful";
        this.modalRef = this.modalService.show(this.modal)
      });
  }

  // Custom Validator
  MustMatch(passwordCtrl: AbstractControl): ValidatorFn {
    return (confirmPasswordCtrl: AbstractControl): { [key: string]: boolean } | null => {
      // return null if controls haven't initialized yet
      if (!passwordCtrl && !confirmPasswordCtrl) {
        return null;
      }

      // return null if another validator has already found an error on the matchingControl
      if (passwordCtrl.hasError && !confirmPasswordCtrl.hasError) {
        return null;
      }
      // set error on matchingControl if validation fails
      if (passwordCtrl.value !== confirmPasswordCtrl.value) {
        return { 'mustMatch': true };
      }
      else {
        return null;
      }
    }
  }
}
