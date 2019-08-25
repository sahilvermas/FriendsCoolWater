import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { Customer, CustomerVM } from '../customer.model';
import { Observable } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  isNewEntry = true;
  modalMessage: string;
  customers$: Observable<CustomerVM[]>;
  customers: CustomerVM[] = [];
  userRoleStatus: string;
  loggedUserId: string;
  modalRef: BsModalRef;
  selectedCustomer: Customer;

  cusForm = new FormGroup({
    id: new FormControl(),
    firmName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    customerName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    mobileNumber: new FormControl('', Validators.maxLength(12)),
    address: new FormControl('', [Validators.maxLength(80)]),
    description: new FormControl('', [Validators.maxLength(100)]),
    unitPerDay: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern("^[0-9]*$")]),
    unitPrice: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.pattern("^[0-9]*$")]),
    active: new FormControl(true, Validators.required)
  });

  constructor(
    private modalService: BsModalService,
    private customerService: CustomerService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastService,
    private accountService: AccountService
  ) { }

  @ViewChild('cusManageTemplate', { static: false }) cusManageModal: TemplateRef<any>;
  @ViewChild('cusDelTemplate', { static: false }) cusDelModal: TemplateRef<any>;

  ngOnInit() {
    this.modalMessage = 'All Fields Are Mandatory';

    this.accountService.loggedUserId.subscribe(result => { this.loggedUserId = result; });
    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result; });
    this.customers$ = this.customerService.getCustomers();

    // get teams
    this.customers$.subscribe(result => {
      this.customers = result;
      this.chRef.detectChanges();
    }, error => {
      if (error.status === 401) {
        this.toastr.warning('Unauthorized Access');
      }
    });

  }

  onAddModal() {
    this.isNewEntry = true;
    this.showModal(this.cusManageModal);
  }

  onUpdateModal(cus) {
    this.isNewEntry = false;
    this.cusForm.setValue({
      id: cus.id,
      firmName: cus.firmName,
      customerName: cus.customerName,
      mobileNumber: cus.mobileNumber,
      address: cus.address,
      description: cus.description,
      unitPrice: cus.unitPrice,
      unitPerDay: cus.unitPerDay,
      active: cus.active
    });
    this.showModal(this.cusManageModal);
  }

  showModal(template: TemplateRef<any>, size: string = 'lg') {
    this.modalRef = this.modalService.show(template, { class: `modal-${size}`, backdrop: 'static', keyboard: false })
  }

  onSaveCustomer() {
    let cusResponse$;
    let resMsg = '';
    let customer = this.cusForm.value;

    if (this.isNewEntry) {
      customer.createdOn = new Date();
      customer.createdBy = this.loggedUserId;

      cusResponse$ = this.customerService.addCustomer(customer);
      resMsg = 'Customer saved successfully';
    } else if (!this.isNewEntry && customer.id) {

      customer.modifiedOn = new Date();
      customer.modifiedBy = this.loggedUserId;

      cusResponse$ = this.customerService.updateCustomer(customer.id, customer);
      resMsg = 'Customer updated successfully';
    }

    cusResponse$.subscribe(
      result => {
        this.customerService.clearCache();
        this.customers$ = this.customerService.getCustomers();

        this.customers$.subscribe(newlist => {
          this.customers = newlist;
          this.modalRef.hide();
          this.cusForm.reset();
        });

        this.toastr.success(resMsg);
      },
      error => {
        this.toastr.error(error.error.message);
      });
  }

  onSelect(customerId: number) {
    this.router.navigateByUrl('/customer/' + customerId);
  }

  onDeleteConfirm(customer: Customer): void {
    this.selectedCustomer = customer;
    this.showModal(this.cusDelModal, 'md');
  }

  onDelete() {
    const customerId = this.selectedCustomer.id;
    if (customerId) {
      this.customerService.deleteCustomer(customerId).subscribe(result => {
        this.customerService.clearCache();
        this.customers$ = this.customerService.getCustomers();
        this.customers$.subscribe(newlist => {
          this.customers = newlist;
        });
        this.selectedCustomer = null;
        this.modalRef.hide();
        this.toastr.success('Customer deleted successfully');
      },
        error => {
          if (error.error) {
            this.toastr.error(error.error.message);
          }
        })
    }
  }

}
