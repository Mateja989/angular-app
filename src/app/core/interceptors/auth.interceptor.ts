import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private protectedGetRoutes: string[] = [
    '/jobs',
    '/employers/jobs',
    '/jobapplications',
    '/auditlog'
  ];

  constructor(private authService : AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (
      (request.method === 'GET' && this.isProtectedRoute(request.url, this.protectedGetRoutes)) ||
      (request.method === 'POST')
    ) {
      const token = this.authService.token();

      if (token) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    }

    return next.handle(request);
  }

  private isProtectedRoute(url: string, protectedRoutes: string[]): boolean {
    return protectedRoutes.some(route => url.includes(route));
  }
}
