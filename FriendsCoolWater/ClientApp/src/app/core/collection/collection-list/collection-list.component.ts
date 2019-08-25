import { Component, OnInit, ChangeDetectorRef, TemplateRef, ViewChild } from '@angular/core';
import { TeamService } from '../../team/team.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ToastService } from '../../shared/toast.service';
import { AccountService } from '../../account/account.service';

import { Team } from '../../team/team.Model';
import { CollectionService } from '../collection.service';
import { Collection } from '../collection.model';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  userRoleStatus: string;
  loggedUserId: string;
  modalRef: BsModalRef;

  teams$: Observable<Team[]>;
  teams: Team[] = [];

  collections$: Observable<Collection[]>;
  collections: Collection[] = [];

  collectionForm: FormGroup;

  @ViewChild('collectionTemplate', { static: false }) collectionModal: TemplateRef<any>;

  constructor(
    private modalService: BsModalService,
    private chRef: ChangeDetectorRef,
    private router: Router,
    private toastr: ToastService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private teamService: TeamService,
    private collectionService: CollectionService) { }

  ngOnInit() {

    this.accountService.loggedUserId.subscribe(result => { this.loggedUserId = result; });
    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result; });

    this.collectionForm = this.formBuilder.group({
      comments: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });
    this.getTeams();

    this.getCollection(new Date(), new Date());
  }

  showModal(template: TemplateRef<any>, size: string = 'lg') {
    this.modalRef = this.modalService.show(template, { class: `modal-${size}`, backdrop: 'static', keyboard: false })
  }

  onAddCollection() {
    this.showModal(this.collectionModal);
  }

  getTeams() {

    this.teams$ = this.teamService.getTeams();

    this.teams$.subscribe(result => {
      this.teams = result;
      this.chRef.detectChanges();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });
  }

  getCollection(startDate: Date, endDate: Date) {
    this.collections$ = this.collectionService.getCollection(startDate, endDate);

    this.collections$.subscribe(result => {
      this.collections = result;
      console.log(result);
      this.chRef.detectChanges();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });
  }
}
