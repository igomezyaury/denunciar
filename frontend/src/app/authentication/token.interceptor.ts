import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService, private router: Router) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (request.headers.get('Authorization')) {
      next.handle(request);
    }

    request = request.clone({
      setHeaders: {
        Authorization: `${this.authenticationService.getToken()}`
      }
    });
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.authenticationService.logout();
          this.router.navigate(['/auth/login']);
        }
        return throwError(err);
      }));
  }
}