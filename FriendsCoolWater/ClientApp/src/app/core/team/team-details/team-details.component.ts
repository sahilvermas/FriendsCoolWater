import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../team.service';
import { Team } from '../team.Model';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {

  userRoleStatus: string;
  team: Team;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private teamService: TeamService) { }

  ngOnInit() {
    this.accountService.loggedUserRole.subscribe(result => { this.userRoleStatus = result; });
    const teamId = this.route.snapshot.paramMap.get('id');
    if (teamId) {
      this.getTeamDetails(Number(teamId));
    }
  }

  getTeamDetails(teamId: number) {

    this.teamService.getTeamById(teamId)
      .subscribe(result => {
        this.team = result;
      }, error => {
        console.log(error);
      });

  }

}
