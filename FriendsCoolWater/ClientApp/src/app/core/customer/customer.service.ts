import { Injectable } from '@angular/core';
import { ApiUrl } from '../helpers/apiUrl';
import { Observable } from 'rxjs';
import { Customer, CustomerVM } from './customer.model';
import { shareReplay, flatMap, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CustomerService {
  apiUrl: ApiUrl;

  private customers$: Observable<CustomerVM[]>;

  constructor(private http: HttpClient) {
    this.apiUrl = new ApiUrl();
  }

  getCustomers(): Observable<CustomerVM[]> {
    if (!this.customers$) {
      // shareReplay will get the data from the browser cache if any
      this.customers$ = this.http.get<CustomerVM[]>(this.apiUrl.getCustomersUrl).pipe(shareReplay());
    }

    return this.customers$;
  }

  getCustomerById(customerId: number): Observable<CustomerVM> {
    // flatMap is use to search the record from the list with lambda expr.
    return this.getCustomers()
      .pipe(flatMap(result => result), first(customer => customer.id === customerId));
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl.addCustomerUrl, customer);
  }

  updateCustomer(customerId: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl.updateCustomerUrl + customerId, customer);
  }

  deleteCustomer(customerId: number): Observable<any> {
    return this.http.delete(this.apiUrl.deleteCustomerUrl + customerId);
  }

  // Clear cache
  clearCache() {
    this.customers$ = null;
  }
}
