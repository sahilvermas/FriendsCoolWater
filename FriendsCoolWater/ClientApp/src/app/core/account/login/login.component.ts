import { Component, OnInit } from '@angular/core';
import { LoginModel } from '../account-model';
import { AccountService } from '../account.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginModel: LoginModel;
  loginForm: FormGroup;

  Username: FormControl;
  Password: FormControl;
  returnUrl: string;
  errorMessage: string;
  invalidLogin: boolean;

  constructor(
    private accountService: AccountService,
    private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  ngOnInit() {

    // Initialize Form Controls
    this.Username = new FormControl('', [Validators.required]);
    this.Password = new FormControl('', [Validators.required]);

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loginForm = this.fb.group({
      "Username": this.Username,
      "Password": this.Password
    });
  }

  onLogin(): void {
    let formData = this.loginForm.value;
    this.accountService
      .Login(new LoginModel(formData.Username, formData.Password))
      .subscribe(result => {
        this.invalidLogin = false;
        this.router.navigateByUrl(this.returnUrl);

        let token = (<any>result).token;
        console.log(result);
        console.log('Token' + token);

      }, error => {
        this.invalidLogin = true;
        if (error.status === 401) {
          this.errorMessage = error.error.loginError;
        } else {
          this.errorMessage = 'Something happen wrong our end. Please try after some time.'
          console.log(error);
        }
      });
  }

}
