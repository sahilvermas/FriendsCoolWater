import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerService } from './customer.service';
import { CustomerRoutingModule } from './customer-routing-module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [CustomerListComponent, CustomerDetailComponent],
  imports: [CommonModule, CustomerRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  exports: [CustomerListComponent, CustomerDetailComponent],
  providers: [CustomerService]
})
export class CustomerModule { }
