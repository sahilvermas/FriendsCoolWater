import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';


const routes: Routes = [
    { path: '', component: EmployeeListComponent, canActivate: [AuthGuardService] },
    { path: 'employee-list', component: EmployeeListComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: EmployeeDetailsComponent, canActivate: [AuthGuardService] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }