import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="restaurant-list">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="container">
          <h1 class="logo" (click)="goHome()">🍕 FoodiHub</h1>
          <nav class="nav-menu">
            <button class="nav-btn" (click)="goBack()">
              <i class="fas fa-arrow-left"></i>
              Back
            </button>
            <button class="nav-btn" (click)="viewCart()">
              <i class="fas fa-shopping-cart"></i>
              Cart ({{cartItemCount}})
            </button>
          </nav>
        </div>
      </header>

      <!-- Location Info -->
      <div class="location-banner">
        <div class="container">
          <h2>
            <i class="fas fa-map-marker-alt"></i>
            Restaurants in {{pincode}}
          </h2>
          <button class="change-location-btn" (click)="changeLocation()">
            <i class="fas fa-edit"></i>
            Change Location
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <main class="main-content">
        <div class="container">
          <!-- Filter Section -->
          <div class="filters-section">
            <div class="filter-tabs">
              <button 
                class="filter-tab" 
                [class.active]="selectedFilter === 'all'"
                (click)="applyFilter('all')"
              >
                All Restaurants
              </button>
              <button 
                class="filter-tab" 
                [class.active]="selectedFilter === 'rating'"
                (click)="applyFilter('rating')"
              >
                Top Rated
              </button>
              <button 
                class="filter-tab" 
                [class.active]="selectedFilter === 'delivery'"
                (click)="applyFilter('delivery')"
              >
                Fast Delivery
              </button>
            </div>
          </div>

          <!-- Restaurant Grid -->
          <div class="restaurants-grid">
            <div 
              class="restaurant-card" 
              *ngFor="let restaurant of filteredRestaurants"
              (click)="selectRestaurant(restaurant.id)"
            >
              <div class="restaurant-image">
                <img [src]="restaurant.image" [alt]="restaurant.name">
                <div class="restaurant-badge" *ngIf="restaurant.isPromoted">
                  <span>PROMOTED</span>
                </div>
              </div>
              <div class="restaurant-info">
                <h3>{{restaurant.name}}</h3>
                <p class="cuisine">{{restaurant.cuisine}}</p>
                <div class="restaurant-meta">
                  <div class="rating">
                    <i class="fas fa-star"></i>
                    <span>{{restaurant.rating}}</span>
                    <span class="reviews">({{restaurant.reviews}} reviews)</span>
                  </div>
                  <div class="delivery-info">
                    <i class="fas fa-clock"></i>
                    <span>{{restaurant.deliveryTime}} mins</span>
                  </div>
                </div>
                <div class="restaurant-details">
                  <span class="delivery-fee" *ngIf="restaurant.deliveryFee > 0">
                    ₹{{restaurant.deliveryFee}} delivery
                  </span>
                  <span class="free-delivery" *ngIf="restaurant.deliveryFee === 0">
                    Free delivery
                  </span>
                  <span class="min-order" *ngIf="restaurant.minOrder > 0">
                    Min ₹{{restaurant.minOrder}}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div class="empty-state" *ngIf="filteredRestaurants.length === 0">
            <i class="fas fa-search"></i>
            <h3>No restaurants found</h3>
            <p>Try changing your filters or location</p>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .restaurant-list {
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
      cursor: pointer;
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

    .location-banner {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 20px 0;
    }

    .location-banner .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .location-banner h2 {
      margin: 0;
      font-size: 1.5rem;
    }

    .location-banner i {
      margin-right: 10px;
      color: #26de81;
    }

    .change-location-btn {
      background: rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.3);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .change-location-btn:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .main-content {
      padding: 30px 0;
    }

    .filters-section {
      margin-bottom: 30px;
    }

    .filter-tabs {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .filter-tab {
      background: white;
      border: 2px solid #e1e5e9;
      color: #666;
      padding: 12px 24px;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .filter-tab.active,
    .filter-tab:hover {
      background: #ff6b6b;
      border-color: #ff6b6b;
      color: white;
    }

    .restaurants-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 25px;
    }

    .restaurant-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .restaurant-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .restaurant-image {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .restaurant-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .restaurant-card:hover .restaurant-image img {
      transform: scale(1.05);
    }

    .restaurant-badge {
      position: absolute;
      top: 15px;
      left: 15px;
      background: #ff6b6b;
      color: white;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .restaurant-info {
      padding: 20px;
    }

    .restaurant-info h3 {
      font-size: 1.4rem;
      color: #333;
      margin-bottom: 8px;
      font-weight: 600;
    }

    .cuisine {
      color: #666;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }

    .restaurant-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .rating i {
      color: #ff6b6b;
    }

    .rating span:first-of-type {
      font-weight: 600;
      color: #333;
    }

    .reviews {
      color: #999;
      font-size: 0.9rem;
    }

    .delivery-info {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #26de81;
      font-weight: 500;
    }

    .restaurant-details {
      display: flex;
      gap: 15px;
      font-size: 0.9rem;
    }

    .delivery-fee {
      color: #666;
    }

    .free-delivery {
      color: #26de81;
      font-weight: 600;
    }

    .min-order {
      color: #666;
    }

    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
    }

    .empty-state i {
      font-size: 4rem;
      margin-bottom: 20px;
      color: #ccc;
    }

    .empty-state h3 {
      font-size: 1.5rem;
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      .dashboard-header .container {
        flex-direction: column;
        gap: 15px;
      }
      
      .location-banner .container {
        flex-direction: column;
        gap: 15px;
        text-align: center;
      }
      
      .filter-tabs {
        justify-content: center;
      }
      
      .restaurants-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class RestaurantListComponent implements OnInit {
  pincode = '';
  cartItemCount = 0;
  selectedFilter = 'all';
  
  restaurants = [
    {
      id: 1,
      name: 'Pizza Palace',
      cuisine: 'Italian, Pizza, Fast Food',
      rating: 4.5,
      reviews: 1250,
      deliveryTime: 30,
      deliveryFee: 40,
      minOrder: 150,
      isPromoted: true,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      name: 'Burger Hub',
      cuisine: 'American, Burgers, Fast Food',
      rating: 4.2,
      reviews: 980,
      deliveryTime: 25,
      deliveryFee: 0,
      minOrder: 100,
      isPromoted: false,
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      name: 'Sushi Express',
      cuisine: 'Japanese, Sushi, Asian',
      rating: 4.7,
      reviews: 750,
      deliveryTime: 40,
      deliveryFee: 60,
      minOrder: 200,
      isPromoted: false,
      image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      name: 'Taco Fiesta',
      cuisine: 'Mexican, Tacos, Spicy',
      rating: 4.3,
      reviews: 650,
      deliveryTime: 35,
      deliveryFee: 35,
      minOrder: 120,
      isPromoted: true,
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      name: 'Indian Spice',
      cuisine: 'Indian, Curry, Vegetarian',
      rating: 4.6,
      reviews: 890,
      deliveryTime: 45,
      deliveryFee: 50,
      minOrder: 180,
      isPromoted: false,
      image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      name: 'Thai Garden',
      cuisine: 'Thai, Asian, Noodles',
      rating: 4.4,
      reviews: 420,
      deliveryTime: 40,
      deliveryFee: 0,
      minOrder: 150,
      isPromoted: false,
      image: 'https://images.unsplash.com/photo-1559847844-d72779d96592?w=400&h=300&fit=crop'
    },
    {
      id: 7,
      name: 'Sandwich Corner',
      cuisine: 'Continental, Sandwiches',
      rating: 4.1,
      reviews: 320,
      deliveryTime: 20,
      deliveryFee: 25,
      minOrder: 80,
      isPromoted: false,
      image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop'
    },
    {
      id: 8,
      name: 'Healthy Bowls',
      cuisine: 'Healthy, Salads, Smoothies',
      rating: 4.8,
      reviews: 180,
      deliveryTime: 30,
      deliveryFee: 0,
      minOrder: 120,
      isPromoted: true,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop'
    }
  ];

  filteredRestaurants = [...this.restaurants];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pincode = params['pincode'];
    });
  }

  applyFilter(filter: string) {
    this.selectedFilter = filter;
    
    switch(filter) {
      case 'rating':
        this.filteredRestaurants = this.restaurants
          .filter(r => r.rating >= 4.5)
          .sort((a, b) => b.rating - a.rating);
        break;
      case 'delivery':
        this.filteredRestaurants = this.restaurants
          .filter(r => r.deliveryTime <= 30)
          .sort((a, b) => a.deliveryTime - b.deliveryTime);
        break;
      default:
        this.filteredRestaurants = [...this.restaurants];
    }
  }

  selectRestaurant(restaurantId: number) {
    this.router.navigate(['/restaurant', restaurantId, 'menu']);
  }

  changeLocation() {
    this.router.navigate(['/customer']);
  }

  goBack() {
    this.router.navigate(['/customer']);
  }

  goHome() {
    this.router.navigate(['/welcome']);
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}