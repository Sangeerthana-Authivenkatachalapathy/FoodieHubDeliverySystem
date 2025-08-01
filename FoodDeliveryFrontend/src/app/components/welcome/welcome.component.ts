import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="welcome-container">
      <div class="welcome-content">
        <div class="logo-section">
          <h1 class="logo">🍕 FoodiHub</h1>
          <p class="tagline">Delicious food delivered to your doorstep</p>
        </div>
        
        <div class="role-selection">
          <h2>Choose Your Role</h2>
          <div class="role-buttons">
            <button class="role-btn customer-btn" (click)="selectRole('customer')">
              <i class="fas fa-user"></i>
              <span>Customer</span>
              <p>Order your favorite food</p>
            </button>
            
            <button class="role-btn restaurant-btn" (click)="selectRole('restaurant')">
              <i class="fas fa-store"></i>
              <span>Restaurant</span>
              <p>Manage your restaurant</p>
            </button>
            
            <button class="role-btn delivery-btn" (click)="selectRole('delivery')">
              <i class="fas fa-motorcycle"></i>
              <span>Delivery Partner</span>
              <p>Deliver orders & earn</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
    }

    .welcome-content {
      text-align: center;
      max-width: 800px;
      width: 100%;
    }

    .logo-section {
      margin-bottom: 60px;
    }

    .logo {
      font-size: 3.5rem;
      color: white;
      margin-bottom: 10px;
      font-weight: 700;
      text-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }

    .tagline {
      font-size: 1.2rem;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 0;
    }

    .role-selection h2 {
      color: white;
      font-size: 2rem;
      margin-bottom: 40px;
      font-weight: 600;
    }

    .role-buttons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 30px;
      max-width: 900px;
      margin: 0 auto;
    }

    .role-btn {
      background: white;
      border: none;
      border-radius: 20px;
      padding: 40px 30px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: center;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .role-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.5s;
    }

    .role-btn:hover::before {
      left: 100%;
    }

    .role-btn:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    }

    .customer-btn:hover {
      border-top: 4px solid #ff6b6b;
    }

    .restaurant-btn:hover {
      border-top: 4px solid #4834d4;
    }

    .delivery-btn:hover {
      border-top: 4px solid #26de81;
    }

    .role-btn i {
      font-size: 3rem;
      margin-bottom: 20px;
      display: block;
    }

    .customer-btn i {
      color: #ff6b6b;
    }

    .restaurant-btn i {
      color: #4834d4;
    }

    .delivery-btn i {
      color: #26de81;
    }

    .role-btn span {
      font-size: 1.5rem;
      font-weight: 600;
      color: #333;
      display: block;
      margin-bottom: 10px;
    }

    .role-btn p {
      color: #666;
      font-size: 1rem;
      margin: 0;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .logo {
        font-size: 2.5rem;
      }
      
      .role-selection h2 {
        font-size: 1.5rem;
      }
      
      .role-buttons {
        grid-template-columns: 1fr;
        gap: 20px;
      }
      
      .role-btn {
        padding: 30px 20px;
      }
      
      .role-btn i {
        font-size: 2.5rem;
      }
    }
  `]
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  selectRole(role: string) {
    switch(role) {
      case 'customer':
        this.router.navigate(['/customer']);
        break;
      case 'restaurant':
        this.router.navigate(['/restaurant']);
        break;
      case 'delivery':
        this.router.navigate(['/delivery']);
        break;
    }
  }
}