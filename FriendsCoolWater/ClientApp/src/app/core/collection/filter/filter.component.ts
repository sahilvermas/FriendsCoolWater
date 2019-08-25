import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { Team } from '../../team/team.Model';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  @Input() teams: Team[];
  selectedTeam: number = -1;
  constructor() { }

  ngOnInit() {

  }

  resetSearch(): void {
    this.selectedTeam = -1;
  }
}
