import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-page">
      <!-- Header -->
      <header class="auth-header">
        <div class="container">
          <h1 class="logo" (click)="goHome()">🍕 FoodiHub</h1>
          <button class="nav-btn" (click)="goToRegister()">
            Don't have an account? Register
          </button>
        </div>
      </header>

      <div class="login-container">
        <div class="container">
          <div class="login-card">
            <div class="card-header">
              <h2>Welcome Back!</h2>
              <p>Login to continue your food journey</p>
            </div>

            <form class="login-form" (ngSubmit)="onSubmit()" #loginForm="ngForm">
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input 
                  type="email" 
                  class="form-control"
                  [(ngModel)]="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  email
                  #emailInput="ngModel"
                >
                <div class="error-message" *ngIf="emailInput.invalid && emailInput.touched">
                  Please enter a valid email address
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Password</label>
                <input 
                  type="password" 
                  class="form-control"
                  [(ngModel)]="password"
                  name="password"
                  placeholder="Enter your password"
                  required
                  #passwordInput="ngModel"
                >
                <div class="error-message" *ngIf="passwordInput.invalid && passwordInput.touched">
                  Password is required
                </div>
              </div>

              <div class="form-actions">
                <button type="submit" class="btn btn-primary" [disabled]="loginForm.invalid || logging">
                  <i class="fas fa-spinner fa-spin" *ngIf="logging"></i>
                  <i class="fas fa-sign-in-alt" *ngIf="!logging"></i>
                  <span *ngIf="!logging">Login</span>
                  <span *ngIf="logging">Logging in...</span>
                </button>
              </div>

              <div class="forgot-password">
                <a href="#" (click)="forgotPassword($event)">Forgot your password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
    }

    .auth-header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .auth-header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
    }

    .logo {
      font-size: 2rem;
      color: white;
      margin: 0;
      font-weight: 700;
      cursor: pointer;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .nav-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .nav-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .login-container {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
    }

    .login-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 450px;
    }

    .card-header {
      background: linear-gradient(135deg, #ff6b6b, #ee5a24);
      color: white;
      padding: 40px;
      text-align: center;
    }

    .card-header h2 {
      margin: 0 0 10px 0;
      font-size: 2rem;
      font-weight: 600;
    }

    .card-header p {
      margin: 0;
      opacity: 0.9;
      font-size: 1.1rem;
    }

    .login-form {
      padding: 40px;
    }

    .form-group {
      margin-bottom: 25px;
    }

    .form-label {
      display: block;
      margin-bottom: 8px;
      font-weight: 600;
      color: #333;
    }

    .form-control {
      width: 100%;
      padding: 15px;
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      font-size: 16px;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #ff6b6b;
      box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
    }

    .error-message {
      color: #dc3545;
      font-size: 0.9rem;
      margin-top: 5px;
    }

    .form-actions {
      margin-bottom: 20px;
    }

    .btn {
      width: 100%;
      padding: 15px;
      font-size: 1.1rem;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .forgot-password {
      text-align: center;
    }

    .forgot-password a {
      color: #ff6b6b;
      text-decoration: none;
      font-weight: 500;
    }

    .forgot-password a:hover {
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .auth-header .container {
        flex-direction: column;
        gap: 15px;
      }
      
      .login-container {
        padding: 20px;
      }
      
      .card-header,
      .login-form {
        padding: 30px 20px;
      }
    }
  `]
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  logging = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Any initialization logic
  }

  onSubmit() {
    if (!this.email || !this.password) return;
    
    this.logging = true;
    
    // Simulate login API call
    setTimeout(() => {
      this.logging = false;
      // Simulate successful login
      this.router.navigate(['/payment']);
    }, 2000);
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    alert('Password reset functionality will be implemented in the backend integration');
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goHome() {
    this.router.navigate(['/welcome']);
  }
}