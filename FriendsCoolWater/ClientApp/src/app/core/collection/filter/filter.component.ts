import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

import { Team } from '../../team/team.Model';
import { Customer } from '../../customer/customer.model';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();

  @Input() teams: Team[];
  @Input() customers: Customer[];

  selectedTeam = -1;
  selectedCustomer = -1;
  constructor() {
    //this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

  ngOnInit() {

  }

  resetSearch(): void {
    this.selectedTeam = -1;
    this.selectedCustomer = -1;
    console.log(this.bsRangeValue);
  }
}
