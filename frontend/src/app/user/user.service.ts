import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  usersApiUrl: string = environment.API_URL + '/users';

  constructor(
    private http: HttpClient
  ) { }

  public createUser(user): Observable<any> {
    return this.http.post(this.usersApiUrl, user);
  }

  public editUser(user): Observable<any> {
    return this.http.put(`${this.usersApiUrl}/${user.id}`, user);
  }

  public getAllUsers(): Observable<any> {
    //The hardcoded page_size is temporary. In the future we may not fetch every user at once
    return this.http.get(`${this.usersApiUrl}/?page_size=99999999`);
  }

}