import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import JwtDecode from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthenticationService {

  private serverUrl = '/api';

  constructor(private http: HttpClient) { }

  setJWT(token) {
    localStorage.setItem('jwt', token);
  }

  getJWT() {
    return localStorage.getItem('jwt');
  }

  getUser() {
    return JwtDecode(this.getJWT());
  }

  signin(email: string, password: string) {
    return this.http.post(`${this.serverUrl}/signin`, { email, password }, httpOptions);
  }

  signup(email: string, password: string) {
    return this.http.post(`${this.serverUrl}/signup`, { email, password }, httpOptions);
  }

  signout() {
    localStorage.removeItem('jwt');
  }

}
