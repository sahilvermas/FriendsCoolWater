import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamService } from './team.service';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamListComponent } from './team-list/team-list.component';
import { TeamRoutingModule } from './team-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../helpers/jwt.interceptor';

@NgModule({
  declarations: [TeamListComponent, TeamDetailsComponent],
  imports: [CommonModule, TeamRoutingModule, FormsModule, ReactiveFormsModule, DataTablesModule],
  exports: [TeamListComponent, TeamDetailsComponent],
  providers: [TeamService]
})
export class TeamModule { }
