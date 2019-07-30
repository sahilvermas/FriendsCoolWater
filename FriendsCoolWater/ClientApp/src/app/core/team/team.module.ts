import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamListComponent } from './team-list/team-list.component';

@NgModule({
  declarations: [TeamListComponent, TeamDetailsComponent, TeamListComponent],
  imports: [
    CommonModule
  ],
  exports: [TeamListComponent, TeamDetailsComponent],
  providers: [TeamService]
})
export class TeamModule { }
