import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Team, EmployeesInTeams } from '../team.model';
import { Observable, Subject } from 'rxjs';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';
import { AccountService } from '../../account/account.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {

  userRoleStatus: string;
  loggedUserId: string;

  modalMessage: string;
  modalRef: BsModalRef;
  selectedTeam: Team;
  teams$: Observable<Team[]>;
  teams: Team[] = [];
  employeesInTeams$: Observable<EmployeesInTeams[]>;
  employeesInTeams: EmployeesInTeams[] = [];

  @ViewChild('teamManageTemplate', { static: false }) teamManagemodal: TemplateRef<any>;
  @ViewChild('teamDeleteTemplate', { static: false }) teamDeleteModal: TemplateRef<any>;

  teamForm: FormGroup;

  constructor(
    private teamService: TeamService,
    private modalService: BsModalService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastService,
    private accountService: AccountService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.modalMessage = 'All Fields Are Mandatory';

    this.teamForm = this.formBuilder.group({
      id: new FormControl(),
      name: new FormControl('', [Validators.required, Validators.maxLength(30)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      active: new FormControl(true, Validators.required),
      createdOn: new FormControl(''),
      createdBy: new FormControl(''),
      modifiedOn: new FormControl(''),
      modifiedBy: new FormControl('')
    });

    this.accountService.loggedUserId.subscribe(result => { this.loggedUserId = result; });
    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result; });
    this.loadDefaultData();
  }

  loadDefaultData() {

    this.teams$ = this.teamService.getTeams();
    this.employeesInTeams$ = this.teamService.getEmployeesInTeams();

    this.teams$.subscribe(result => {
      this.teams = result;
      this.chRef.detectChanges();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });

    this.employeesInTeams$.subscribe(result => {
      this.employeesInTeams = result;
      this.chRef.detectChanges();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });
  }

  showModal(template: TemplateRef<any>, size: string = 'lg') {
    this.modalRef = this.modalService.show(template, { class: `modal-${size}`, backdrop: 'static', keyboard: false })
  }

  onAddTeam() {
    this.teamForm.reset();
    this.showModal(this.teamManagemodal);
  }

  onUpdateTeam(team: Team): void {

    this.teamForm.setValue(
      {
        id: team.id,
        name: team.name,
        description: team.description,
        active: team.active,
        createdBy: team.createdBy,
        createdOn: team.createdOn,
        modifiedBy: this.loggedUserId,
        modifiedOn: new Date()
      });

    this.showModal(this.teamManagemodal);

  }

  onSubmit() {
    if (this.teamForm.invalid) {
      return false;
    }

    let teamData: Team = this.teamForm.value;
    let teamRes$: Observable<Team>;

    if (!teamData.id) {
      teamData.id = 0;
      teamData.createdBy = this.loggedUserId;
      teamData.createdOn = new Date();
      teamRes$ = this.teamService.addTeam(teamData);
    } else {
      teamRes$ = this.teamService.updateTeam(teamData.id, teamData);
    }

    teamRes$.subscribe(result => {
      this.teamService.clearCache();
      this.teams$ = this.teamService.getTeams();
      this.modalRef.hide();
      this.loadDefaultData();
      this.toastr.success('Team saved successfully');
    }, error => {
      if (error.error) {
        this.toastr.error(error.error);
      }
      console.log('Could not add Team')
    });

  }

  showTeamDetails(team: Team): void {
    this.selectedTeam = team;

    this.router.navigateByUrl('/team/' + team.id);
  }

  onDeleteConfirm(team: Team): void {
    this.selectedTeam = team;
    this.showModal(this.teamDeleteModal);
  }

  deleteTeam() {

    if (this.selectedTeam) {

      this.teamService.deleteTeam(this.selectedTeam.id).subscribe(result => {
        this.teamService.clearCache();
        this.loadDefaultData();
        this.modalRef.hide();
        this.toastr.success('Team deleted sucessfully');
      }, errorRes => {
        this.modalRef.hide();
        this.toastr.error(errorRes.error);
      });
    }
  }

  ngOnDestroy() {
  }
}
