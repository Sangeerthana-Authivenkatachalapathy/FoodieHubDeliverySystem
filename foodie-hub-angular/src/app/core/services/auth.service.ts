import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { ApiService } from './api.service';
import { User, LoginCredentials, RegisterData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public loading$ = this.loadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('authToken');
    
    if (storedUser && token) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        this.logout();
      }
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  generateOtp(phoneNumber: string): Observable<string> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.apiService.generateOtp(phoneNumber).pipe(
      tap(response => {
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        const errorMessage = error.error?.message || 'Failed to generate OTP';
        this.errorSubject.next(errorMessage);
        return throwError(() => error);
      })
    );
  }

  login(credentials: LoginCredentials): Observable<User> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.apiService.verifyOtp(credentials).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', 'dummy-token'); // Replace with actual token from backend
        this.currentUserSubject.next(user);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        const errorMessage = error.error?.message || 'Invalid OTP';
        this.errorSubject.next(errorMessage);
        return throwError(() => error);
      })
    );
  }

  register(userData: RegisterData): Observable<User> {
    this.loadingSubject.next(true);
    this.errorSubject.next(null);

    return this.apiService.registerUser(userData).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', 'dummy-token');
        this.currentUserSubject.next(user);
        this.loadingSubject.next(false);
      }),
      catchError(error => {
        this.loadingSubject.next(false);
        const errorMessage = error.error?.message || 'Registration failed';
        this.errorSubject.next(errorMessage);
        return throwError(() => error);
      })
    );
  }

  setDigiPin(phoneNumber: string, digiPin: string): Observable<void> {
    return this.apiService.setDigiPin(phoneNumber, digiPin).pipe(
      catchError(error => {
        const errorMessage = error.error?.message || 'Failed to set DigiPin';
        this.errorSubject.next(errorMessage);
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.errorSubject.next(null);
    this.router.navigate(['/login']);
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}