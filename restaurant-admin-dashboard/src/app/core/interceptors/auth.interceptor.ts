import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);

  // Skip interceptor for auth endpoints
  if (req.url.includes('/auth/')) {
    return next(req);
  }

  // Get the token
  const token = authService.getToken();
  
  // Clone request and add authorization header if token exists
  const authReq = token ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`)
  }) : req;

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401) {
        // Token expired or invalid
        if (error.error?.message === 'Token has expired') {
          // Try to refresh token
          const refreshToken = authService.getRefreshToken();
          if (refreshToken) {
            return authService.refreshToken().pipe(
              switchMap(response => {
                // Retry original request with new token
                const newAuthReq = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${response.data.token}`)
                });
                return next(newAuthReq);
              }),
              catchError(refreshError => {
                // Refresh failed, logout user
                authService.logout();
                router.navigate(['/login']);
                toastService.error('Session expired. Please login again.');
                return throwError(() => refreshError);
              })
            );
          }
        }
        
        // No refresh token or other 401 error
        authService.logout();
        router.navigate(['/login']);
        toastService.error('Authentication required. Please login.');
      } else if (error.status === 403) {
        toastService.error('You do not have permission to access this resource.');
      } else if (error.status >= 500) {
        toastService.error('Server error. Please try again later.');
      }

      return throwError(() => error);
    })
  );
};