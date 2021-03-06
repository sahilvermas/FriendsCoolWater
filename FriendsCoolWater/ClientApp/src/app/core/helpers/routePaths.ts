import { Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';
import { TeamModule } from '../team/team.module';
import { ContactUsComponent } from '../contact-us/contact-us.component';
import { CustomerModule } from '../customer/customer.module';
import { CollectionModule } from '../collection/collection.module';

export const RoutePaths: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'contactUs', component: ContactUsComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },
  { path: 'team', loadChildren: () => TeamModule },
  { path: 'customer', loadChildren: () => CustomerModule },
  { path: 'collection', loadChildren: () => CollectionModule },
  { path: '**', component: PageNotFoundComponent }
];
