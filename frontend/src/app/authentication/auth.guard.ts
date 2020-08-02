import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.authenticationService.getToken();
        if (token) {
            //Is logged in
            return true;
        }
        // Isn't logged in
        this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}