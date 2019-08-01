import { Component, OnInit, ViewChild, TemplateRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Team } from '../team.model';
import { Observable, Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { TeamService } from '../team.service';
import { Router } from '@angular/router';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit, OnDestroy {
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

  // Modal properties
  modalMessage: string;
  modalRef: BsModalRef;
  selectedTeam: Team;
  teams$: Observable<Team[]>;
  teams: Team[] = [];
  userRoleStatus: string;


  // Datatables Properties
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;

  constructor(private teamService: TeamService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private accountService: AccountService) { }

  /// Load Add New Team Modal
  onAddTeam() {
    this.modalRef = this.modalService.show(this.modal);
  }

  // Method to Add new Team
  onSubmit() {
    let newTeam = this.insertForm.value;

    this.teamService.addTeam(newTeam).subscribe(
      result => {
        this.teamService.clearCache();
        this.teams$ = this.teamService.getTeams();

        this.teams$.subscribe(newlist => {
          this.teams = newlist;
          this.modalRef.hide();
          this.insertForm.reset();
          this.rerender();

        });
        console.log("New Team added");

      },
      error => console.log('Could not add Team')

    )

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
    let editTeam = this.updateForm.value;
    this.teamService.updateTeam(editTeam.id, editTeam).subscribe(
      result => {
        console.log('Team Updated');
        this.teamService.clearCache();
        this.teams$ = this.teamService.getTeams();
        this.teams$.subscribe(updatedlist => {
          this.teams = updatedlist;

          this.modalRef.hide();
          this.rerender();
        });
      },
      error => console.log('Could Not Update Team')
    )
  }

  // Load the update Modal

  onUpdateModal(teamEdit: Team): void {
    this._id.setValue(teamEdit.id);
    this._name.setValue(teamEdit.name);
    this._description.setValue(teamEdit.description);
    this._active.setValue(teamEdit.active);

    this.updateForm.setValue({
      'id': this._id.value,
      'name': this._name.value,
      'description': this._description.value,
      'active': this._active.value
    });

    this.modalRef = this.modalService.show(this.editmodal);

  }

  // Method to Delete the team
  onDelete(team: Team): void {
    this.teamService.deleteTeam(team.id).subscribe(result => {
      this.teamService.clearCache();
      this.teams$ = this.teamService.getTeams();
      this.teams$.subscribe(newlist => {
        this.teams = newlist;

        this.rerender();
      })
    })
  }

  onSelect(team: Team): void {
    this.selectedTeam = team;

    this.router.navigateByUrl("/team/" + team.id);
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 9,
      autoWidth: true,
      order: [[0, 'desc']]
    };

    this.teams$ = this.teamService.getTeams();

    this.teams$.subscribe(result => {
      this.teams = result;

      this.chRef.detectChanges();

      this.dtTrigger.next();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });

    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result });


    // Modal Message
    this.modalMessage = "All Fields Are Mandatory";

    // Initializing Add team properties

    this.name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this.description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this.active = new FormControl('', [Validators.required]);

    this.insertForm = this.fb.group({

      'name': this.name,
      'description': this.description,
      'active': this.active
    });

    // Initializing Update Team properties
    this._name = new FormControl('', [Validators.required, Validators.maxLength(50)]);
    this._description = new FormControl('', [Validators.required, Validators.maxLength(150)]);
    this._active = new FormControl('', [Validators.required]);
    this._id = new FormControl();

    this.updateForm = this.fb.group(
      {
        'id': this._id,
        'name': this._name,
        'description': this._description,
        'active': this._active
      });


  }

  ngOnDestroy() {
    // Do not forget to unsubscribe
    this.dtTrigger.unsubscribe();
  }
}
