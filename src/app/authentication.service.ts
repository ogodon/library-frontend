import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from './user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  private serverUrl = 'http://localhost/api';

  constructor(private http: HttpClient) { }

  whoami(): Observable<any> {
    return this.http.get(`${this.serverUrl}/whoami`);
  }

  signin(email: string, password: string): Observable<any> {
    return this.http.post(`${this.serverUrl}/signin`, { email, password }, httpOptions);
  }

  signout(): Observable<any> {
    return this.http.post(`${this.serverUrl}/signout`, {}, httpOptions);
  }

}
