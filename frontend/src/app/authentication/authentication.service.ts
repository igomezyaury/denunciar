import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationService {
  
    /**
     * @todo: store user in variable rather than using it directly from localStorage  
     * */ 
    // private currentUserSubject: BehaviorSubject<User>;
    // public currentUser: Observable<User>;
    private token: string;
  
    constructor(
      private http: HttpClient
    ) {
        // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        // this.currentUser = this.currentUserSubject.asObservable();
        this.token = localStorage.getItem('token');
    }
  
    login(email: string, password: string): Observable<any> {
      return this.http
        .post(`${environment.API_URL}/login`, {
          email: email,
          password: password
        })
        .pipe(map((res: any) => {
            localStorage.setItem('token', res.access_token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.token = res.access_token;
        }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.token = null;
    }

    getToken(): string{
      return this.token;
    }
}