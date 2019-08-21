import { Component, OnInit, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { EmployeeService } from '../employee.service';
import { Observable } from 'rxjs';
import { Employee, EmployeeVM } from '../employee.model';
import { Team } from '../../team/team.Model';
import { Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastService } from '../../shared/toast.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  isNewEntry = true;
  modalMessage: string;
  teams$: Observable<Team[]>;
  teams: Team[] = [];
  employees$: Observable<Employee[]>;
  employees: Employee[] = [];
  userRoleStatus: string;
  modalRef: BsModalRef;
  selectedEmployee: Employee;

  empForm = new FormGroup({
    id: new FormControl(),
    teamId: new FormControl('-1', Validators.required),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
    lastName: new FormControl('', Validators.maxLength(30)),
    active: new FormControl(true, Validators.required)
  });

  constructor(
    private modalService: BsModalService,
    private teamService: TeamService,
    private employeeService: EmployeeService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastService,
    private accountService: AccountService) { }

  // Add Modal
  @ViewChild('empManageTemplate', { static: false }) empManageModal: TemplateRef<any>;

  @ViewChild('empDelTemplate', { static: false }) empDelModal: TemplateRef<any>;

  ngOnInit() {
    // Modal Message
    this.modalMessage = 'All Fields Are Mandatory';

    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result; });
    this.teams$ = this.teamService.getTeams();
    this.employees$ = this.employeeService.getEmployees();

    // get teams
    this.teams$.subscribe(result => {
      this.teams = result;
      this.chRef.detectChanges();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });

    // get employees
    this.employees$.subscribe(result => {
      this.employees = result;
      this.chRef.detectChanges();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });

  }

  onAddEmployee() {
    this.empForm.reset();
    this.isNewEntry = true;
    this.showModal(this.empManageModal);
  }

  onUpdateModal(emp: EmployeeVM) {
    this.isNewEntry = false;
    this.empForm.setValue({
      id: emp.id,
      teamId: emp.teamId,
      firstName: emp.firstName,
      lastName: emp.lastName,
      active: emp.active
    });

    this.showModal(this.empManageModal);
  }

  onSubmitEmployee() {
    let msg = '';
    const employee = this.empForm.value;
    let response$ = null;
    if (employee.id) {
      msg = 'Employee updated successfully'
      response$ = this.updateEmployee(employee.id, employee);
    } else {
      msg = 'Employee saved successfully';
      response$ = this.addNewEmployee(employee);
    }

    response$.subscribe(
      result => {
        console.log(result);
        this.employeeService.clearCache();
        this.employees$ = this.employeeService.getEmployees();

        this.employees$.subscribe(newlist => {
          this.employees = newlist;
          this.modalRef.hide();
          this.empForm.reset();
        });
        this.toastr.success(msg);
      },
      error => {
        if (error.error) {
          this.toastr.error(error.error.message);
        }
        console.log(error);
      }
    );
  }

  addNewEmployee(newEmployee: Employee): Observable<Employee> {
    return this.employeeService.addEmployee(newEmployee);
  }

  updateEmployee(id: number, employee: Employee): Observable<Employee> {
    return this.employeeService.updateEmployee(id, employee);
  }

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;

    this.router.navigateByUrl('/employee/' + employee.id);
  }

  onDeleteConfirm(employee: Employee): void {
    this.selectedEmployee = employee;
    this.showModal(this.empDelModal);
  }

  onDelete() {
    const employeeId = this.selectedEmployee.id;
    if (employeeId) {
      this.employeeService.deleteEmployee(employeeId).subscribe(result => {
        this.employeeService.clearCache();
        this.employees$ = this.employeeService.getEmployees();
        this.employees$.subscribe(newlist => {
          this.employees = newlist;
        });
        this.selectedEmployee = null;
        this.modalRef.hide();
        this.toastr.success('Employee deleted sucessfully');
      }, error => {
        if (error.error) {
          this.toastr.error(error.error.message);
        }
      })
    }
  }

  // show modal box common function
  showModal(template: TemplateRef<any>, size: string = 'md', ): void {
    this.modalRef = this.modalService
      .show(template, { class: `modal-${size}`, backdrop: 'static', keyboard: false });
  }

}
