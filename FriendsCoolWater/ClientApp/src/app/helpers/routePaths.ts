import { Routes } from "@angular/router";
import { HomeComponent } from '../core/home/home.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { ListTeamComponent } from '../core/team/list-team/list-team.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';

export const RoutePaths: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'team', component: ListTeamComponent },
    { path: '**', component: PageNotFoundComponent }
];