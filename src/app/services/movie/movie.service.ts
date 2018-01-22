import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class MovieService {

  private serverUrl = 'http://localhost/api';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { }

  getHttpHeaders(): HttpHeaders {
    const headers = {
      'Content-Type': 'application/json'
    };
    const token = this.authenticationService.getJWT();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return new HttpHeaders(headers);
  }

  all(): Observable<any> {
    return this.http.get(`${this.serverUrl}/movie`, { headers: this.getHttpHeaders() });
  }

  get(id: Number): Observable<any> {
    return this.http.get(`${this.serverUrl}/movie/${id}`, { headers: this.getHttpHeaders() });
  }

  update(movie): Observable<any> {
    return this.http.put(`${this.serverUrl}/movie/${movie.id}`, movie, { headers: this.getHttpHeaders() });
  }

  create(movie): Observable<any> {
    return this.http.post(`${this.serverUrl}/movie`, movie, { headers: this.getHttpHeaders() });
  }

  delete(movie): Observable<any> {
    return this.http.delete(`${this.serverUrl}/movie/${movie.id}`, { headers: this.getHttpHeaders() });
  }

}
