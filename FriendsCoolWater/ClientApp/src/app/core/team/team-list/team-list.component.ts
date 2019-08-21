import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Team } from '../team.model';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
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

  // For the FormControl - Adding teams
  insertForm: FormGroup;
  name: FormControl;
  description: FormControl;
  active: FormControl;

  // Updating the Team
  updateForm: FormGroup;
  _id: FormControl;
  _name: FormControl;
  _description: FormControl;
  _active: FormControl;

  // Add Modal
  @ViewChild('template', { static: false }) modal: TemplateRef<any>;
  // Update Modal
  @ViewChild('editTemplate', { static: false }) editmodal: TemplateRef<any>;
  // Delete Modal
  @ViewChild('teamDelTemplate', { static: false }) deleteModal: DataTableDirective;

  // Modal properties
  modalMessage: string;
  modalRef: BsModalRef;
  selectedTeam: Team;
  teams$: Observable<Team[]>;
  teams: Team[] = [];

  // Datatables Properties
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(
    private teamService: TeamService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastService,
    private accountService: AccountService) { }

  /// Load Add New Team Modal
  onAddTeam() {
    this.modalRef = this.modalService.show(this.modal, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  // Method to Add new Team
  onSubmit() {
    let newTeam: Team = this.insertForm.value;
    newTeam.createdBy = this.loggedUserId;
    newTeam.createdOn = new Date();

    this.teamService.addTeam(newTeam).subscribe(
      result => {
        this.teamService.clearCache();
        this.teams$ = this.teamService.getTeams();

        this.teams$.subscribe(newlist => {
          this.teams = newlist;
          this.modalRef.hide();
          this.insertForm.reset();
          // Not using datatables on this page, so commenting code.
          // this.rerender();

        });
        this.toastr.success('Team saved successfully');

      },
      error => {
        if (error.error) {
          this.toastr.error(error.error);
          console.log(error)
        }
        console.log('Could not add Team')
      }

    );

  }

  // We will use this method to destroy old table and re-render new table
  rerender() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first in the current context
      dtInstance.destroy();

      // Call the dtTrigger to rerender again
      this.dtTrigger.next();

    });
  }

  // Update an Existing Team
  onUpdateTeam() {
    let editTeam: Team = this.updateForm.value;
    editTeam.modifiedBy = this.loggedUserId;
    editTeam.modifiedOn = new Date();

    this.teamService.updateTeam(editTeam.id, editTeam).subscribe(
      result => {
        console.log('Team Updated');
        this.teamService.clearCache();
        this.teams$ = this.teamService.getTeams();
        this.teams$.subscribe(updatedlist => {
          this.teams = updatedlist;

          this.modalRef.hide();
          //this.rerender();
          this.toastr.success('Team updated successfully');
        });
      },
      error => {
        if (error.error) {
          this.toastr.error(error.error);
        }
        console.log('Could Not Update Team');
      }
    );
  }

  // Load the update Modal
  onUpdateModal(teamEdit: Team): void {
    this._id.setValue(teamEdit.id);
    this._name.setValue(teamEdit.name);
    this._description.setValue(teamEdit.description);
    this._active.setValue(teamEdit.active);

    this.updateForm.setValue({
      id: this._id.value,
      name: this._name.value,
      description: this._description.value,
      active: this._active.value
    });

    this.modalRef = this.modalService.show(this.editmodal, { class: 'modal-md', backdrop: 'static', keyboard: false });

  }

  // Method to Delete the team
  onDeleteConfirm(team: Team): void {
    this.selectedTeam = team;
    this.modalRef = this.modalService.show(this.deleteModal, { class: 'modal-md', backdrop: 'static', keyboard: false });
  }

  onDelete() {

    if (this.selectedTeam) {

      this.teamService.deleteTeam(this.selectedTeam.id).subscribe(result => {
        this.teamService.clearCache();
        this.teams$ = this.teamService.getTeams();
        this.teams$.subscribe(newlist => {
          this.teams = newlist;

          //this.rerender();
          this.toastr.success('Team deleted sucessfully');
        });
      }, errorRes => {
        this.modalRef.hide();
        this.toastr.error(errorRes.error);
      });
    }
  }

  onSelect(team: Team): void {
    this.selectedTeam = team;

    this.router.navigateByUrl('/team/' + team.id);
  }

  ngOnInit() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.accountService.loggedUserId.subscribe(result => { this.loggedUserId = result; });
    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result; });

    this.teams$ = this.teamService.getTeams();

    // Modal Message
    this.modalMessage = 'All Fields Are Mandatory';

    // Initializing Add team properties
    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.description = new FormControl('', Validators.maxLength(100));
    this.active = new FormControl(true, [Validators.required]);

    this.insertForm = this.fb.group({
      name: this.name,
      description: this.description,
      active: this.active
    });

    // Initializing Update Team properties
    this._name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this._description = new FormControl('', Validators.maxLength(100));
    this._active = new FormControl(true, [Validators.required]);
    this._id = new FormControl();

    this.updateForm = this.fb.group(
      {
        id: this._id,
        name: this._name,
        description: this._description,
        active: this._active
      });

    this.teams$.subscribe(result => {
      this.teams = result;

      this.chRef.detectChanges();

      this.dtTrigger.next();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });

  }

  ngOnDestroy() {
    // Do not forget to unsubscribe
    this.dtTrigger.unsubscribe();
  }
}
