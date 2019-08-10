import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamListComponent } from './team-list/team-list.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { TeamDetailsComponent } from './team-details/team-details.component';

const routes: Routes = [
    { path: '', component: TeamListComponent, canActivate: [AuthGuardService] },
    { path: 'team-list', component: TeamListComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: TeamDetailsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamRoutingModule { }
