import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="customer-dashboard">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="container">
          <h1 class="logo">🍕 FoodiHub</h1>
          <nav class="nav-menu">
            <button class="nav-btn" (click)="goHome()">
              <i class="fas fa-home"></i>
              Home
            </button>
            <button class="nav-btn" (click)="viewCart()">
              <i class="fas fa-shopping-cart"></i>
              Cart ({{cartItemCount}})
            </button>
          </nav>
        </div>
      </header>

      <!-- Main Content (Disabled when modal is open) -->
      <main class="main-content" [class.disabled]="showPincodeModal">
        <div class="container">
          <div class="hero-section">
            <h2>Welcome to FoodiHub!</h2>
            <p>Discover delicious food from restaurants near you</p>
          </div>

          <!-- Restaurant Grid (Disabled) -->
          <div class="restaurants-section">
            <h3>Popular Restaurants</h3>
            <div class="restaurant-grid">
              <div class="restaurant-card disabled" *ngFor="let restaurant of dummyRestaurants">
                <img [src]="restaurant.image" [alt]="restaurant.name">
                <div class="restaurant-info">
                  <h4>{{restaurant.name}}</h4>
                  <p>{{restaurant.cuisine}}</p>
                  <div class="restaurant-rating">
                    <span class="rating">★ {{restaurant.rating}}</span>
                    <span class="delivery-time">{{restaurant.deliveryTime}} mins</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <!-- Pincode Modal -->
      <div class="modal-overlay" *ngIf="showPincodeModal" (click)="closePincodeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Enter Your Location</h3>
            <button class="close-btn" (click)="closePincodeModal()">×</button>
          </div>
          <div class="modal-body">
            <p>Please enter your pincode to see restaurants in your area</p>
            <div class="form-group">
              <label class="form-label">Pincode</label>
              <input 
                type="text" 
                class="form-control" 
                [(ngModel)]="pincode" 
                placeholder="Enter 6-digit pincode"
                maxlength="6"
                (keyup.enter)="submitPincode()"
              >
            </div>
            <div class="modal-actions">
              <button class="btn btn-primary" (click)="submitPincode()" [disabled]="!isValidPincode()">
                Find Restaurants
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .customer-dashboard {
      min-height: 100vh;
      background: #f8f9fa;
    }

    .dashboard-header {
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .dashboard-header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
    }

    .logo {
      font-size: 2rem;
      color: #ff6b6b;
      margin: 0;
      font-weight: 700;
    }

    .nav-menu {
      display: flex;
      gap: 20px;
    }

    .nav-btn {
      background: none;
      border: 2px solid #ff6b6b;
      color: #ff6b6b;
      padding: 10px 20px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .nav-btn:hover {
      background: #ff6b6b;
      color: white;
    }

    .nav-btn i {
      margin-right: 8px;
    }

    .main-content {
      padding: 40px 0;
      transition: opacity 0.3s ease;
    }

    .main-content.disabled {
      opacity: 0.3;
      pointer-events: none;
    }

    .hero-section {
      text-align: center;
      margin-bottom: 60px;
    }

    .hero-section h2 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 15px;
    }

    .hero-section p {
      font-size: 1.2rem;
      color: #666;
    }

    .restaurants-section h3 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 30px;
    }

    .restaurant-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 30px;
    }

    .restaurant-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .restaurant-card.disabled {
      pointer-events: none;
      opacity: 0.6;
    }

    .restaurant-card:hover:not(.disabled) {
      transform: translateY(-5px);
    }

    .restaurant-card img {
      width: 100%;
      height: 200px;
      object-fit: cover;
    }

    .restaurant-info {
      padding: 20px;
    }

    .restaurant-info h4 {
      font-size: 1.3rem;
      color: #333;
      margin-bottom: 8px;
    }

    .restaurant-info p {
      color: #666;
      margin-bottom: 15px;
    }

    .restaurant-rating {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .rating {
      color: #ff6b6b;
      font-weight: 600;
    }

    .delivery-time {
      color: #26de81;
      font-weight: 500;
    }

    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      backdrop-filter: blur(5px);
    }

    .modal {
      background: white;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
      animation: modalSlideIn 0.3s ease;
    }

    .modal-header {
      padding: 25px 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      color: #333;
      margin: 0;
      font-size: 1.5rem;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 2rem;
      color: #999;
      cursor: pointer;
      padding: 0;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .close-btn:hover {
      color: #333;
    }

    .modal-body {
      padding: 30px;
    }

    .modal-body p {
      color: #666;
      margin-bottom: 25px;
      text-align: center;
    }

    .modal-actions {
      margin-top: 25px;
      text-align: center;
    }

    @keyframes modalSlideIn {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .dashboard-header .container {
        flex-direction: column;
        gap: 15px;
      }
      
      .nav-menu {
        justify-content: center;
      }
      
      .hero-section h2 {
        font-size: 2rem;
      }
      
      .restaurant-grid {
        grid-template-columns: 1fr;
      }
      
      .modal {
        margin: 20px;
      }
    }
  `]
})
export class CustomerDashboardComponent implements OnInit {
  showPincodeModal = true;
  pincode = '';
  cartItemCount = 0;

  dummyRestaurants = [
    {
      id: 1,
      name: 'Pizza Palace',
      cuisine: 'Italian, Pizza',
      rating: 4.5,
      deliveryTime: 30,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Burger Hub',
      cuisine: 'American, Fast Food',
      rating: 4.2,
      deliveryTime: 25,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Sushi Express',
      cuisine: 'Japanese, Sushi',
      rating: 4.7,
      deliveryTime: 40,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Taco Fiesta',
      cuisine: 'Mexican, Tacos',
      rating: 4.3,
      deliveryTime: 35,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Indian Spice',
      cuisine: 'Indian, Curry',
      rating: 4.6,
      deliveryTime: 45,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Thai Garden',
      cuisine: 'Thai, Asian',
      rating: 4.4,
      deliveryTime: 40,
      image: 'https://images.unsplash.com/photo-1559847844-d72779d96592?w=400&h=300&fit=crop'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Show pincode modal when component loads
    this.showPincodeModal = true;
  }

  isValidPincode(): boolean {
    return this.pincode.length === 6 && /^\d+$/.test(this.pincode);
  }

  submitPincode() {
    if (this.isValidPincode()) {
      this.showPincodeModal = false;
      // Navigate to restaurant list with pincode
      this.router.navigate(['/restaurants', this.pincode]);
    }
  }

  closePincodeModal() {
    // Navigate back to welcome page if user closes modal
    this.router.navigate(['/welcome']);
  }

  goHome() {
    this.router.navigate(['/welcome']);
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}