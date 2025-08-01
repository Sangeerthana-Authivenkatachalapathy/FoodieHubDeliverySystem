import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { ApiService } from '../../core/services/api.service';
import { Restaurant } from '../../core/models';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, HeaderComponent],
  template: `
    <app-header></app-header>
    <div class="home-container">
      <section class="hero-section">
        <h1 class="hero-title">Delicious Food, Delivered Fast</h1>
        <p class="hero-subtitle">
          Discover amazing restaurants in your area and get your favorite food delivered to your doorstep
        </p>
      </section>

      <section class="search-section">
        <h2 class="search-title">Find Restaurants Near You</h2>
        <form [formGroup]="searchForm" (ngSubmit)="handleSearch()" class="search-form">
          <input 
            type="text" 
            class="form-control" 
            placeholder="Enter your pincode..."
            formControlName="pincode"
          >
          <button type="submit" class="btn btn-primary btn-large">
            🔍 Search
          </button>
        </form>
      </section>

      <section class="quick-actions">
        <a routerLink="/restaurants" class="action-card">
          <div class="action-icon">🍽️</div>
          <h3 class="action-title">Browse Restaurants</h3>
          <p class="action-description">Explore all available restaurants in your area</p>
        </a>
        
        <a routerLink="/orders" class="action-card">
          <div class="action-icon">📦</div>
          <h3 class="action-title">Track Orders</h3>
          <p class="action-description">View your order history and track current orders</p>
        </a>
        
        <a routerLink="/profile" class="action-card">
          <div class="action-icon">👤</div>
          <h3 class="action-title">Your Profile</h3>
          <p class="action-description">Manage your account and delivery addresses</p>
        </a>
      </section>

      <section class="featured-section">
        <h2 class="section-title">Featured Restaurants</h2>
        
        <div *ngIf="loading" class="loading-spinner">
          Loading restaurants...
        </div>
        
        <div *ngIf="error" class="error-message">
          Failed to load restaurants. Please try again later.
        </div>
        
        <div *ngIf="featuredRestaurants.length > 0" class="restaurant-grid">
          <a 
            *ngFor="let restaurant of featuredRestaurants" 
            [routerLink]="['/restaurants', restaurant.id]"
            class="restaurant-card"
          >
            <div class="restaurant-image">🍽️</div>
            <div class="restaurant-info">
              <h3 class="restaurant-name">{{ restaurant.restaurantName }}</h3>
              <div class="restaurant-meta">
                <div class="meta-item">
                  📍 {{ restaurant.city }}
                </div>
                <div class="meta-item">
                  ⭐ 4.5
                </div>
                <div class="meta-item">
                  🕒 30-45 min
                </div>
              </div>
              <p class="restaurant-description">
                {{ restaurant.description || 'Delicious food awaits you!' }}
              </p>
            </div>
          </a>
        </div>
        
        <div *ngIf="featuredRestaurants.length > 0" class="text-center mt-30">
          <a routerLink="/restaurants" class="btn btn-primary btn-large">
            View All Restaurants →
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }

    .hero-section {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 20px;
      padding: 60px 40px;
      text-align: center;
      color: white;
      margin-bottom: 40px;
    }

    .hero-title {
      font-size: 3rem;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .hero-subtitle {
      font-size: 1.2rem;
      margin-bottom: 30px;
      opacity: 0.9;
    }

    .search-section {
      background: white;
      border-radius: 15px;
      padding: 30px;
      margin-bottom: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .search-title {
      text-align: center;
      margin-bottom: 20px;
      color: #333;
    }

    .search-form {
      display: flex;
      gap: 15px;
      max-width: 600px;
      margin: 0 auto;
    }

    .search-form .form-control {
      flex: 1;
    }

    .quick-actions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .action-card {
      background: white;
      border-radius: 15px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      text-decoration: none;
      color: inherit;
      transition: transform 0.3s ease;
    }

    .action-card:hover {
      transform: translateY(-5px);
    }

    .action-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
    }

    .action-title {
      font-size: 1.2rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #333;
    }

    .action-description {
      color: #666;
      font-size: 14px;
    }

    .featured-section {
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 30px;
      color: #333;
      text-align: center;
    }

    .restaurant-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .restaurant-card {
      background: white;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      text-decoration: none;
      color: inherit;
    }

    .restaurant-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    }

    .restaurant-image {
      height: 200px;
      background: linear-gradient(45deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
    }

    .restaurant-info {
      padding: 20px;
    }

    .restaurant-name {
      font-size: 1.3rem;
      font-weight: 600;
      margin-bottom: 8px;
      color: #333;
    }

    .restaurant-meta {
      display: flex;
      align-items: center;
      gap: 15px;
      color: #666;
      font-size: 14px;
      margin-bottom: 10px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .restaurant-description {
      color: #666;
      font-size: 14px;
      line-height: 1.4;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2rem;
      }

      .search-form {
        flex-direction: column;
      }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  searchForm: FormGroup;
  restaurants: Restaurant[] = [];
  featuredRestaurants: Restaurant[] = [];
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService
  ) {
    this.searchForm = this.fb.group({
      pincode: ['']
    });
  }

  ngOnInit(): void {
    this.loadFeaturedRestaurants();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadFeaturedRestaurants(): void {
    this.loading = true;
    this.error = null;

    this.apiService.getAllRestaurants()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (restaurants) => {
          this.restaurants = restaurants;
          this.featuredRestaurants = restaurants.slice(0, 6);
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load restaurants';
          this.loading = false;
          console.error('Error loading restaurants:', error);
        }
      });
  }

  handleSearch(): void {
    const pincode = this.searchForm.get('pincode')?.value;
    if (pincode?.trim()) {
      window.location.href = `/restaurants?pincode=${pincode}`;
    }
  }
}