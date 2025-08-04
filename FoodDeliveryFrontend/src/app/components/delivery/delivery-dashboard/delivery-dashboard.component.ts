import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delivery-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="delivery-dashboard">
      <div class="container">
        <div class="dashboard-header">
          <h1>🏍️ Delivery Partner Dashboard</h1>
          <button class="btn btn-secondary" (click)="goBack()">
            <i class="fas fa-arrow-left"></i>
            Back to Home
          </button>
        </div>
        
        <div class="coming-soon">
          <i class="fas fa-motorcycle"></i>
          <h2>Coming Soon!</h2>
          <p>Delivery partner features are currently under development.</p>
          <div class="features-list">
            <div class="feature-item">
              <i class="fas fa-map-marked-alt"></i>
              <span>Live Order Tracking</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-money-bill-wave"></i>
              <span>Earnings Management</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-route"></i>
              <span>Route Optimization</span>
            </div>
            <div class="feature-item">
              <i class="fas fa-clock"></i>
              <span>Delivery History</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .delivery-dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 40px 20px;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 60px;
    }

    .dashboard-header h1 {
      color: white;
      font-size: 2.5rem;
      margin: 0;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }

    .coming-soon {
      background: white;
      border-radius: 20px;
      padding: 60px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      max-width: 600px;
      margin: 0 auto;
    }

    .coming-soon i {
      font-size: 4rem;
      color: #26de81;
      margin-bottom: 30px;
    }

    .coming-soon h2 {
      color: #333;
      font-size: 2rem;
      margin-bottom: 20px;
    }

    .coming-soon p {
      color: #666;
      font-size: 1.2rem;
      margin-bottom: 40px;
    }

    .features-list {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .feature-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 10px;
      color: #26de81;
      font-weight: 500;
    }

    .feature-item i {
      font-size: 1.2rem;
    }

    @media (max-width: 768px) {
      .dashboard-header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
      
      .coming-soon {
        padding: 40px 20px;
      }
      
      .features-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DeliveryDashboardComponent {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/welcome']);
  }
}