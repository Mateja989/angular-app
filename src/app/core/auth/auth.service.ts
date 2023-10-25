import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, logout } from './store/auth.actions';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of, tap, throwError } from 'rxjs';
import { User } from './models/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = "http://localhost:5000/api/auth";

  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router // Injektujte Router ovde
  ) { }

  login(email: string, password: string) {
    return this.http.post<any>(this.apiUrl, { email, password }).pipe(
      map((response) => {
        localStorage.setItem('token',response.token)
        const user: User = this.parseJwt(response.token);
        this.store.dispatch(login({ user }));
      }),
      catchError((error) => {
        return throwError('Došlo je do greške prilikom prijave.');
      }),
      tap(() => {
        this.router.navigate(['/dashboard']); // Redirekcija nakon uspešne prijave
      })
    );
  }

  loginWithToken(token: string) {
      const user: User = this.parseJwt(token);
      this.store.dispatch(login({ user }));
      return of(true); 
  }

  token() {
    return localStorage.getItem('token');
  }

  removeToken() {
    const token = localStorage.getItem('token');
    if (token) localStorage.removeItem('token');
  }

  logout() {
    this.store.dispatch(logout())
    this.removeToken()
  }

  parseJwt(token : string) : User{
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
