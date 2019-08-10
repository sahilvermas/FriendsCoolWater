import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs';
import { Utility } from './utility';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private accountService: AccountService, private util: Utility) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.accountService.isUserLoggedIn;
        const token = this.util.getLocalStorage('JwtToken');
        if (currentUser && token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}
