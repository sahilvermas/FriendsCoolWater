import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from './account.service';
import { Utility } from '../helpers/Utility';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule
  ],
  exports: [LoginComponent, RegisterComponent],
  providers: [AccountService, Utility]
})
export class AccountModule { }
