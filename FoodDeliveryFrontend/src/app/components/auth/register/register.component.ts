import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface RegistrationForm {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  address: string;
  pincode: string;
  digiPin: string;
  confirmDigiPin: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="register-page">
      <!-- Header -->
      <header class="auth-header">
        <div class="container">
          <h1 class="logo" (click)="goHome()">🍕 FoodiHub</h1>
          <button class="nav-btn" (click)="goToLogin()">
            Already have an account? Login
          </button>
        </div>
      </header>

      <div class="register-container">
        <div class="container">
          <div class="register-layout">
            <!-- Registration Form -->
            <main class="register-content">
              <div class="register-card">
                <div class="card-header">
                  <h2>Create Your Account</h2>
                  <p>Join FoodiHub and start ordering delicious food!</p>
                </div>

                <form class="register-form" (ngSubmit)="onSubmit()" #registerForm="ngForm">
                  <!-- Step 1: Personal Information -->
                  <div class="form-step" *ngIf="currentStep === 1">
                    <h3>Personal Information</h3>
                    
                    <div class="form-group">
                      <label class="form-label">Full Name</label>
                      <input 
                        type="text" 
                        class="form-control"
                        [(ngModel)]="formData.name"
                        name="name"
                        placeholder="Enter your full name"
                        required
                        #name="ngModel"
                      >
                      <div class="error-message" *ngIf="name.invalid && name.touched">
                        Name is required
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Email Address</label>
                      <input 
                        type="email" 
                        class="form-control"
                        [(ngModel)]="formData.email"
                        name="email"
                        placeholder="Enter your email"
                        required
                        email
                        #email="ngModel"
                      >
                      <div class="error-message" *ngIf="email.invalid && email.touched">
                        <span *ngIf="email.errors?.['required']">Email is required</span>
                        <span *ngIf="email.errors?.['email']">Please enter a valid email</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        class="form-control"
                        [(ngModel)]="formData.phoneNumber"
                        name="phoneNumber"
                        placeholder="Enter your phone number"
                        required
                        pattern="[0-9]{10}"
                        #phoneNumber="ngModel"
                      >
                      <div class="error-message" *ngIf="phoneNumber.invalid && phoneNumber.touched">
                        <span *ngIf="phoneNumber.errors?.['required']">Phone number is required</span>
                        <span *ngIf="phoneNumber.errors?.['pattern']">Please enter a valid 10-digit phone number</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Password</label>
                      <input 
                        type="password" 
                        class="form-control"
                        [(ngModel)]="formData.password"
                        name="password"
                        placeholder="Create a password"
                        required
                        minlength="6"
                        #password="ngModel"
                      >
                      <div class="error-message" *ngIf="password.invalid && password.touched">
                        <span *ngIf="password.errors?.['required']">Password is required</span>
                        <span *ngIf="password.errors?.['minlength']">Password must be at least 6 characters</span>
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Confirm Password</label>
                      <input 
                        type="password" 
                        class="form-control"
                        [(ngModel)]="formData.confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        required
                        #confirmPassword="ngModel"
                      >
                      <div class="error-message" *ngIf="confirmPassword.touched && formData.password !== formData.confirmPassword">
                        Passwords do not match
                      </div>
                    </div>

                    <div class="step-actions">
                      <button type="button" class="btn btn-primary" (click)="nextStep()" [disabled]="!isStep1Valid()">
                        Next Step
                        <i class="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Step 2: Address Information -->
                  <div class="form-step" *ngIf="currentStep === 2">
                    <h3>Address Information</h3>
                    
                    <div class="form-group">
                      <label class="form-label">Pincode</label>
                      <div class="pincode-input">
                        <input 
                          type="text" 
                          class="form-control"
                          [(ngModel)]="formData.pincode"
                          name="pincode"
                          placeholder="Enter 6-digit pincode"
                          maxlength="6"
                          required
                          pattern="[0-9]{6}"
                          #pincode="ngModel"
                          (input)="onPincodeChange()"
                        >
                        <button 
                          type="button" 
                          class="verify-btn"
                          (click)="verifyPincode()"
                          [disabled]="!isValidPincode() || pincodeVerifying"
                        >
                          <i class="fas fa-check" *ngIf="pincodeVerified"></i>
                          <i class="fas fa-spinner fa-spin" *ngIf="pincodeVerifying"></i>
                          <span *ngIf="!pincodeVerified && !pincodeVerifying">Verify</span>
                          <span *ngIf="pincodeVerified">Verified</span>
                        </button>
                      </div>
                      <div class="error-message" *ngIf="pincode.invalid && pincode.touched">
                        Please enter a valid 6-digit pincode
                      </div>
                      <div class="success-message" *ngIf="pincodeVerified">
                        Pincode verified! We deliver to this area.
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Full Address</label>
                      <textarea 
                        class="form-control"
                        [(ngModel)]="formData.address"
                        name="address"
                        placeholder="Enter your complete address"
                        rows="3"
                        required
                        #address="ngModel"
                      ></textarea>
                      <div class="error-message" *ngIf="address.invalid && address.touched">
                        Address is required
                      </div>
                    </div>

                    <div class="step-actions">
                      <button type="button" class="btn btn-secondary" (click)="previousStep()">
                        <i class="fas fa-arrow-left"></i>
                        Previous
                      </button>
                      <button type="button" class="btn btn-primary" (click)="nextStep()" [disabled]="!isStep2Valid()">
                        Next Step
                        <i class="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>

                  <!-- Step 3: DigiPin Setup -->
                  <div class="form-step" *ngIf="currentStep === 3">
                    <h3>Setup DigiPin</h3>
                    <p class="step-description">Create a 4-digit DigiPin for quick authentication and secure transactions.</p>
                    
                    <div class="form-group">
                      <label class="form-label">Create DigiPin</label>
                      <input 
                        type="password" 
                        class="form-control digipin-input"
                        [(ngModel)]="formData.digiPin"
                        name="digiPin"
                        placeholder="Enter 4-digit DigiPin"
                        maxlength="4"
                        required
                        pattern="[0-9]{4}"
                        #digiPin="ngModel"
                      >
                      <div class="error-message" *ngIf="digiPin.invalid && digiPin.touched">
                        DigiPin must be exactly 4 digits
                      </div>
                    </div>

                    <div class="form-group">
                      <label class="form-label">Confirm DigiPin</label>
                      <input 
                        type="password" 
                        class="form-control digipin-input"
                        [(ngModel)]="formData.confirmDigiPin"
                        name="confirmDigiPin"
                        placeholder="Confirm your DigiPin"
                        maxlength="4"
                        required
                        #confirmDigiPin="ngModel"
                      >
                      <div class="error-message" *ngIf="confirmDigiPin.touched && formData.digiPin !== formData.confirmDigiPin">
                        DigiPins do not match
                      </div>
                    </div>

                    <div class="digipin-info">
                      <h4>DigiPin Benefits:</h4>
                      <ul>
                        <li><i class="fas fa-shield-alt"></i> Secure payment authentication</li>
                        <li><i class="fas fa-clock"></i> Quick order confirmation</li>
                        <li><i class="fas fa-lock"></i> Account security protection</li>
                      </ul>
                    </div>

                    <div class="step-actions">
                      <button type="button" class="btn btn-secondary" (click)="previousStep()">
                        <i class="fas fa-arrow-left"></i>
                        Previous
                      </button>
                      <button type="submit" class="btn btn-primary" [disabled]="!isStep3Valid() || registering">
                        <i class="fas fa-spinner fa-spin" *ngIf="registering"></i>
                        <i class="fas fa-user-plus" *ngIf="!registering"></i>
                        <span *ngIf="!registering">Create Account</span>
                        <span *ngIf="registering">Creating Account...</span>
                      </button>
                    </div>
                  </div>
                </form>

                <!-- Progress Indicator -->
                <div class="progress-indicator">
                  <div class="progress-step" [class.active]="currentStep >= 1" [class.completed]="currentStep > 1">
                    <span class="step-number">1</span>
                    <span class="step-label">Personal Info</span>
                  </div>
                  <div class="progress-line" [class.completed]="currentStep > 1"></div>
                  <div class="progress-step" [class.active]="currentStep >= 2" [class.completed]="currentStep > 2">
                    <span class="step-number">2</span>
                    <span class="step-label">Address</span>
                  </div>
                  <div class="progress-line" [class.completed]="currentStep > 2"></div>
                  <div class="progress-step" [class.active]="currentStep >= 3">
                    <span class="step-number">3</span>
                    <span class="step-label">DigiPin</span>
                  </div>
                </div>
              </div>
            </main>

            <!-- Info Panel -->
            <aside class="info-panel">
              <div class="info-card">
                <h3>Why Join FoodiHub?</h3>
                <div class="feature-list">
                  <div class="feature-item">
                    <i class="fas fa-utensils"></i>
                    <div>
                      <h4>Wide Variety</h4>
                      <p>Choose from thousands of restaurants and cuisines</p>
                    </div>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-shipping-fast"></i>
                    <div>
                      <h4>Fast Delivery</h4>
                      <p>Get your food delivered hot and fresh in 30 minutes</p>
                    </div>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-shield-alt"></i>
                    <div>
                      <h4>Secure Payments</h4>
                      <p>Multiple payment options with bank-level security</p>
                    </div>
                  </div>
                  <div class="feature-item">
                    <i class="fas fa-star"></i>
                    <div>
                      <h4>Quality Assured</h4>
                      <p>Only verified restaurants with high ratings</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-page {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

    .register-container {
      padding: 40px 0;
    }

    .register-layout {
      display: grid;
      grid-template-columns: 1fr 400px;
      gap: 40px;
      align-items: start;
    }

    .register-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
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

    .register-form {
      padding: 40px;
    }

    .form-step h3 {
      color: #333;
      margin-bottom: 20px;
      font-size: 1.5rem;
    }

    .step-description {
      color: #666;
      margin-bottom: 25px;
      line-height: 1.5;
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

    .digipin-input {
      text-align: center;
      font-size: 1.5rem;
      letter-spacing: 0.5rem;
    }

    .pincode-input {
      display: flex;
      gap: 10px;
    }

    .pincode-input .form-control {
      flex: 1;
    }

    .verify-btn {
      background: #26de81;
      color: white;
      border: none;
      padding: 15px 25px;
      border-radius: 10px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      min-width: 100px;
    }

    .verify-btn:hover:not(:disabled) {
      background: #20bf6b;
    }

    .verify-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.9rem;
      margin-top: 5px;
    }

    .success-message {
      color: #26de81;
      font-size: 0.9rem;
      margin-top: 5px;
      font-weight: 500;
    }

    .step-actions {
      display: flex;
      gap: 15px;
      margin-top: 30px;
    }

    .step-actions .btn {
      flex: 1;
      padding: 15px;
      font-size: 1.1rem;
      font-weight: 600;
    }

    .digipin-info {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 25px;
    }

    .digipin-info h4 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1.1rem;
    }

    .digipin-info ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .digipin-info li {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 5px 0;
      color: #666;
    }

    .digipin-info li i {
      color: #26de81;
      width: 16px;
    }

    .progress-indicator {
      display: flex;
      align-items: center;
      padding: 30px 40px;
      background: #f8f9fa;
      border-top: 1px solid #e1e5e9;
    }

    .progress-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      text-align: center;
    }

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #e1e5e9;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-bottom: 8px;
      transition: all 0.3s ease;
    }

    .progress-step.active .step-number {
      background: #ff6b6b;
      color: white;
    }

    .progress-step.completed .step-number {
      background: #26de81;
      color: white;
    }

    .step-label {
      font-size: 0.9rem;
      color: #666;
      font-weight: 500;
    }

    .progress-step.active .step-label,
    .progress-step.completed .step-label {
      color: #333;
      font-weight: 600;
    }

    .progress-line {
      height: 2px;
      background: #e1e5e9;
      flex: 1;
      margin: 0 20px;
      margin-bottom: 32px;
      transition: background 0.3s ease;
    }

    .progress-line.completed {
      background: #26de81;
    }

    .info-panel {
      position: sticky;
      top: 40px;
    }

    .info-card {
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    }

    .info-card h3 {
      color: #333;
      margin-bottom: 25px;
      font-size: 1.5rem;
      text-align: center;
    }

    .feature-list {
      display: grid;
      gap: 20px;
    }

    .feature-item {
      display: flex;
      gap: 15px;
      align-items: flex-start;
    }

    .feature-item i {
      color: #ff6b6b;
      font-size: 1.5rem;
      margin-top: 5px;
    }

    .feature-item h4 {
      color: #333;
      margin: 0 0 8px 0;
      font-size: 1.1rem;
    }

    .feature-item p {
      color: #666;
      margin: 0;
      font-size: 0.95rem;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .auth-header .container {
        flex-direction: column;
        gap: 15px;
      }
      
      .register-layout {
        grid-template-columns: 1fr;
      }
      
      .info-panel {
        order: 1;
        position: static;
      }
      
      .register-content {
        order: 2;
      }
      
      .card-header,
      .register-form {
        padding: 30px 20px;
      }
      
      .progress-indicator {
        padding: 20px;
      }
      
      .step-actions {
        flex-direction: column;
      }
      
      .pincode-input {
        flex-direction: column;
      }
    }
  `]
})
export class RegisterComponent implements OnInit {
  currentStep = 1;
  pincodeVerified = false;
  pincodeVerifying = false;
  registering = false;

  formData: RegistrationForm = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    address: '',
    pincode: '',
    digiPin: '',
    confirmDigiPin: ''
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Any initialization logic
  }

  isValidPincode(): boolean {
    return this.formData.pincode.length === 6 && /^\d+$/.test(this.formData.pincode);
  }

  onPincodeChange() {
    this.pincodeVerified = false;
  }

  verifyPincode() {
    if (!this.isValidPincode()) return;
    
    this.pincodeVerifying = true;
    
    // Simulate API call
    setTimeout(() => {
      this.pincodeVerifying = false;
      this.pincodeVerified = true;
    }, 2000);
  }

  isStep1Valid(): boolean {
    return !!(
      this.formData.name &&
      this.formData.email &&
      this.formData.phoneNumber &&
      this.formData.password &&
      this.formData.confirmPassword &&
      this.formData.password === this.formData.confirmPassword &&
      this.formData.password.length >= 6 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formData.email) &&
      /^[0-9]{10}$/.test(this.formData.phoneNumber)
    );
  }

  isStep2Valid(): boolean {
    return !!(
      this.formData.pincode &&
      this.formData.address &&
      this.pincodeVerified
    );
  }

  isStep3Valid(): boolean {
    return !!(
      this.formData.digiPin &&
      this.formData.confirmDigiPin &&
      this.formData.digiPin === this.formData.confirmDigiPin &&
      /^[0-9]{4}$/.test(this.formData.digiPin)
    );
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (!this.isStep3Valid()) return;
    
    this.registering = true;
    
    // Simulate registration API call
    setTimeout(() => {
      this.registering = false;
      alert('Registration successful! Please login to continue.');
      this.router.navigate(['/login']);
    }, 3000);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goHome() {
    this.router.navigate(['/welcome']);
  }
}