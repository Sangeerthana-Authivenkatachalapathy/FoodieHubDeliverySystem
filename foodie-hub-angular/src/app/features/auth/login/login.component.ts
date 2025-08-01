import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1 class="title">Welcome to FoodieHub</h1>
        
        <div *ngIf="step === 'phone'">
          <p class="subtitle">Enter your phone number to get started</p>
          
          <div *ngIf="error$ | async as error" class="error-message">
            {{ error }}
          </div>
          
          <form [formGroup]="phoneForm" (ngSubmit)="handleGenerateOtp()">
            <div class="form-group">
              <div class="form-icon">📱</div>
              <input 
                type="tel" 
                class="form-control has-icon" 
                placeholder="Enter phone number"
                formControlName="phoneNumber"
                [disabled]="loading$ | async"
              >
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary btn-large btn-block"
              [disabled]="(loading$ | async) || phoneForm.invalid"
            >
              <span *ngIf="loading$ | async">Sending...</span>
              <span *ngIf="!(loading$ | async)">Send OTP</span>
              <span>→</span>
            </button>
          </form>
        </div>

        <div *ngIf="step === 'otp'">
          <p class="subtitle">Enter the OTP sent to {{ phoneForm.get('phoneNumber')?.value }}</p>
          
          <div *ngIf="error$ | async as error" class="error-message">
            {{ error }}
          </div>
          
          <div *ngIf="otpSent && !(error$ | async)" class="success-message">
            OTP sent successfully! Demo OTP: {{ generatedOtp }}
          </div>
          
          <form [formGroup]="otpForm" (ngSubmit)="handleVerifyOtp()">
            <div class="form-group">
              <div class="form-icon">🔒</div>
              <input 
                type="text" 
                class="form-control has-icon" 
                placeholder="Enter OTP"
                formControlName="otp"
                [disabled]="loading$ | async"
                maxlength="6"
              >
            </div>
            
            <button 
              type="submit" 
              class="btn btn-primary btn-large btn-block"
              [disabled]="(loading$ | async) || otpForm.invalid"
            >
              <span *ngIf="loading$ | async">Verifying...</span>
              <span *ngIf="!(loading$ | async)">Verify OTP</span>
              <span>→</span>
            </button>
            
            <button 
              type="button" 
              class="btn btn-secondary btn-large btn-block mt-20"
              (click)="handleBackToPhone()"
              [disabled]="loading$ | async"
            >
              Back to Phone Number
            </button>
          </form>
        </div>
        
        <p class="link-text">
          Don't have an account? <a routerLink="/register">Sign up here</a>
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    .title {
      text-align: center;
      margin-bottom: 30px;
      color: #333;
      font-size: 28px;
      font-weight: 700;
    }

    .subtitle {
      text-align: center;
      margin-bottom: 30px;
      color: #666;
      font-size: 16px;
    }

    .link-text {
      text-align: center;
      margin-top: 20px;
      color: #666;
    }

    .link-text a {
      color: #667eea;
      text-decoration: none;
      font-weight: 600;
    }

    .link-text a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  phoneForm: FormGroup;
  otpForm: FormGroup;
  step: 'phone' | 'otp' = 'phone';
  otpSent = false;
  generatedOtp = '';

  loading$ = this.authService.loading$;
  error$ = this.authService.error$;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.phoneForm = this.fb.group({
      phoneNumber: ['', [Validators.required]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Redirect if already authenticated
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleGenerateOtp(): void {
    if (this.phoneForm.invalid) return;

    this.authService.clearError();
    const phoneNumber = this.phoneForm.get('phoneNumber')?.value;

    this.authService.generateOtp(phoneNumber)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.generatedOtp = response.otp;
          this.step = 'otp';
          this.otpSent = true;
        },
        error: (error) => {
          console.error('Failed to generate OTP:', error);
        }
      });
  }

  handleVerifyOtp(): void {
    if (this.otpForm.invalid) return;

    this.authService.clearError();
    const phoneNumber = this.phoneForm.get('phoneNumber')?.value;
    const otp = this.otpForm.get('otp')?.value;

    this.authService.login({ phoneNumber, otp })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Failed to verify OTP:', error);
        }
      });
  }

  handleBackToPhone(): void {
    this.step = 'phone';
    this.otpForm.reset();
    this.otpSent = false;
    this.generatedOtp = '';
    this.authService.clearError();
  }
}