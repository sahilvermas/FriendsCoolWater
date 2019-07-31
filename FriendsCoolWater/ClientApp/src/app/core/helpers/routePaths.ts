import { Routes } from "@angular/router";
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { TeamModule } from '../team/team.module';

export const RoutePaths: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'team', loadChildren: () => TeamModule },
    { path: '**', component: PageNotFoundComponent }
];