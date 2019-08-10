import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

const routes: Routes = [
    { path: '', component: EmployeeListComponent },
    { path: 'employee-list', component: EmployeeListComponent },
    { path: ':id', component: EmployeeDetailsComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeeRoutingModule { }
