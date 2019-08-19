import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from '../account/account.service';
import { Utility } from '../helpers/utility';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private accountService: AccountService, private router: Router, private util: Utility) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.isUserLoggedIn.pipe(take(1), map((loginStatus: Boolean) => {

      const destination = state.url;
      const id = route.params.id;

      // Check if the user is not logged in
      if (!loginStatus) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
      }

      // If the user is already logged in
      switch (destination) {
        case '/team':
        case '/team/' + id: {
          if (this.util.getLocalStorage('userRole') === 'Admin'
            || this.util.getLocalStorage('userRole') === 'Employee'
            || this.util.getLocalStorage('userRole') === 'Customer') {
            return true;
          }
        }
        case '/team/update':

          if (this.util.getLocalStorage('userRole') === 'Employee'
            || this.util.getLocalStorage('userRole') === 'Customer') {

            this.router.navigate(['app-page-not-found']);
            return false;
          }

          if (this.util.getLocalStorage('userRole') === 'Admin') {

            return true;
          }

        default:
          return false;
      }

    }));
  }

}
