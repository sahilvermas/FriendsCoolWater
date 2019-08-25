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
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
  styleUrls: ['./collection-list.component.css']
})
export class CollectionListComponent implements OnInit {

  userRoleStatus: string;
  loggedUserId: string;
  modalRef: BsModalRef;
  selectedCol: Collection;

  teams$: Observable<Team[]>;
  teams: Team[] = [];

  collections$: Observable<Collection[]>;
  collections: Collection[] = [];

  colForm: FormGroup;

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

    this.colForm = this.formBuilder.group({
      id: new FormControl(''),
      firmName: new FormControl(''),
      customerName: new FormControl(''),
      customerFullName: new FormControl(''),
      customerId: new FormControl('', Validators.required),
      dateTime: new FormControl('', Validators.required),
      calculatedAmount: new FormControl(0),
      collectionAmount: new FormControl(0, Validators.required),
      comments: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      createdOn: new FormControl(''),
      createdBy: new FormControl(''),
      modifiedOn: new FormControl(''),
      modifiedBy: new FormControl('')
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
      this.chRef.detectChanges();
    }, error => {
      if (error.status === 401) {
        console.log('Unauthorized Access');
      }
    });
  }

  onUpdateModal(col: any) {
    console.log(col);

    this.colForm.setValue({
      id: col.id,
      firmName: col.firmName,
      customerName: col.customerName,
      customerFullName: `${col.firmName} | ${col.customerName}`,
      customerId: col.customerId,
      dateTime: col.dateTime,
      calculatedAmount: col.calculatedAmount,
      collectionAmount: col.collectionAmount,
      comments: col.comments,
      createdOn: col.createdOn,
      createdBy: col.createdBy,
      modifiedOn: col.modifiedOn,
      modifiedBy: col.modifiedBy
    });

    this.showModal(this.collectionModal);
  }

  onSubmit() {

    if (this.colForm.invalid) {
      return false;
    }

    let colData = this.colForm.value;

    let col: Collection = {
      id: colData.id,
      customerId: colData.customerId,
      dateTime: colData.dateTime,
      collectionAmount: colData.collectionAmount,
      comments: colData.comments,
      createdBy: colData.createdBy,
      createdOn: colData.createdOn,
      modifiedBy: this.loggedUserId,
      modifiedOn: new Date()
    };

    this.collectionService.updateCollection(col.id, col).subscribe(result => {
      this.colForm.reset();
      this.collectionService.clearCache();
      this.getCollection(new Date(), new Date());
      this.modalRef.hide();
      this.toastr.success(result.value);
    });
  }
}
