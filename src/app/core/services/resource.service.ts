import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { APP_CONSTS } from 'src/app/shared/config/consts';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  private readonly apiUrl = APP_CONSTS.API.base + APP_CONSTS.API.api;
  constructor(private http: HttpClient) {}


  getResources<T>(name: string): Observable<T> {
    let url = `${this.apiUrl}${name}`;

    return this.http.get<T>(url).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }

  uploadResources<T>(name: string, data: T): Observable<T> {
    let url = `${this.apiUrl}${name}`;

    return this.http.post<T>(url, data).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
      })
    );
  }
}
