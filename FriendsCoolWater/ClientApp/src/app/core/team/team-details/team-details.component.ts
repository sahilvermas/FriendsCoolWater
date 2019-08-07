import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  userRoleStatus: string;

  constructor(private accountService: AccountService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result });
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
  }

}
