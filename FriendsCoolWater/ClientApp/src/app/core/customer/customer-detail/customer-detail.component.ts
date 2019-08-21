import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../customer.service';
import { CustomerVM } from '../customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  userRoleStatus: string;
  customer: CustomerVM;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result; });
    const customerId = this.route.snapshot.paramMap.get('id');
    if (customerId) {
      this.getCustomerDetails(Number(customerId));
    }
  }

  getCustomerDetails(customerId: number) {

    this.customerService.getCustomerById(customerId)
      .subscribe(result => {
        this.customer = result;
      }, error => {
        console.log(error);
      });
  }

}
