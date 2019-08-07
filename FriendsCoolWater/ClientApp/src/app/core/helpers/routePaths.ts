import { Routes } from "@angular/router";
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { TeamModule } from '../team/team.module';
import { EmployeeModule } from '../employee/employee.module';
import { AccessDeniedComponent } from '../errors/access-denied/access-denied.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ContactUsComponent } from '../contact-us/contact-us.component';

export const RoutePaths: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'aboutUs', component: AboutUsComponent, pathMatch: 'full' },
    { path: 'contactUs', component: ContactUsComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'team', loadChildren: () => TeamModule },
    { path: 'employee', loadChildren: () => EmployeeModule },
    { path: 'access-denied', component: AccessDeniedComponent },
    { path: '**', component: PageNotFoundComponent }
];