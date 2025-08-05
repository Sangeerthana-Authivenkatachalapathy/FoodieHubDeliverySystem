import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { AuthResponse, LoginRequest, RegisterRequest, ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('adminToken');
    const user = localStorage.getItem('adminUser');
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        this.currentUserSubject.next(userData);
        this.isAuthenticatedSubject.next(true);
      } catch (error) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.apiService.post<AuthResponse>('/auth/admin/login', credentials).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setAuthData(response.data);
        }
      })
    );
  }

  register(userData: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.apiService.post<AuthResponse>('/auth/admin/register', userData).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setAuthData(response.data);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    localStorage.removeItem('adminRefreshToken');
    
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    
    this.router.navigate(['/auth/login']);
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    const refreshToken = localStorage.getItem('adminRefreshToken');
    
    return this.apiService.post<AuthResponse>('/auth/refresh', { refreshToken }).pipe(
      tap(response => {
        if (response.success && response.data) {
          this.setAuthData(response.data);
        }
      })
    );
  }

  private setAuthData(authData: AuthResponse): void {
    localStorage.setItem('adminToken', authData.token);
    localStorage.setItem('adminRefreshToken', authData.refreshToken);
    localStorage.setItem('adminUser', JSON.stringify(authData.user));
    
    this.currentUserSubject.next(authData.user);
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('adminToken');
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user && user.role === role;
  }

  forgotPassword(email: string): Observable<ApiResponse<any>> {
    return this.apiService.post('/auth/forgot-password', { email });
  }

  resetPassword(token: string, password: string): Observable<ApiResponse<any>> {
    return this.apiService.post('/auth/reset-password', { token, password });
  }
}