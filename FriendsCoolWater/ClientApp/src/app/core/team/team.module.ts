import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListTeamComponent } from './list-team/list-team.component';
import { ManageTeamComponent } from './manage-team/manage-team.component';

@NgModule({
  declarations: [ListTeamComponent, ManageTeamComponent],
  imports: [
    CommonModule
  ],
  exports: [ListTeamComponent, ManageTeamComponent]
})
export class TeamModule { }
