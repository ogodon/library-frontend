import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MovieService {

  private serverUrl = '/api';

  constructor(private http: HttpClient) { }

  all(): Observable<any> {
    return this.http.get(`${this.serverUrl}/movie`);
  }

  get(id: Number): Observable<any> {
    return this.http.get(`${this.serverUrl}/movie/${id}`);
  }

  update(movie): Observable<any> {
    delete movie.createdByUser;
    return this.http.put(`${this.serverUrl}/movie/${movie.id}`, movie);
  }

  create(movie): Observable<any> {
    return this.http.post(`${this.serverUrl}/movie`, movie);
  }

  delete(movie): Observable<any> {
    return this.http.delete(`${this.serverUrl}/movie/${movie.id}`);
  }

}
