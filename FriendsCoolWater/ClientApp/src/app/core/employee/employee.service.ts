import { Injectable } from '@angular/core';
import { ApiUrl } from '../helpers/apiUrl';
import { Observable } from 'rxjs';
import { Employee, EmployeeVM } from './employee.model';
import { shareReplay, flatMap, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EmployeeService {

  apiUrl: ApiUrl;

  private employees$: Observable<EmployeeVM[]>;

  constructor(private http: HttpClient) {
    this.apiUrl = new ApiUrl();
  }

  getEmployees(): Observable<EmployeeVM[]> {
    if (!this.employees$) {
      // shareReplay will get the data from the browser cache if any
      this.employees$ = this.http.get<EmployeeVM[]>(this.apiUrl.getEmployeesUrl).pipe(shareReplay());
    }
    return this.employees$;
  }

  getEmployeeById(employeeId: number): Observable<Employee> {
    // flatMap is use to search the record from the list with lambda expr.
    return this.getEmployees()
      .pipe(flatMap(result => result), first(employee => employee.id === employeeId));
  }

  getEmployeeByTeamId(teamId: number): Observable<Employee> {
    return this.http.get<Employee>(this.apiUrl.getEmployeeByTeamIdUrl);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl.addEmployeeUrl, employee);
  }

  updateEmployee(employeeId: number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(this.apiUrl.updateEmployeeUrl + employeeId, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(this.apiUrl.deleteEmployeeUrl + employeeId);
  }

  // Clear cache
  clearCache() {
    this.employees$ = null;
  }
}
