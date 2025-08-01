import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { CartService } from '../../../core/services/cart.service';
import { User } from '../../../core/models';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header-container">
      <div class="header-content">
        <a routerLink="/home" class="logo">🍔 FoodieHub</a>
        
        <nav class="nav" [class.mobile-hidden]="!mobileMenuOpen">
          <a routerLink="/home" class="nav-link">
            🏠 Home
          </a>
          <a routerLink="/restaurants" class="nav-link">
            🏪 Restaurants
          </a>
          <a routerLink="/orders" class="nav-link">
            📦 Orders
          </a>
        </nav>
        
        <div class="right-section">
          <a routerLink="/cart" class="cart-button">
            🛒
            <span *ngIf="totalItems > 0" class="cart-badge">{{ totalItems }}</span>
          </a>
          
          <div class="user-menu" [class.open]="userMenuOpen">
            <button class="user-button" (click)="toggleUserMenu()">
              👤
              <span class="user-name" *ngIf="currentUser">{{ currentUser.name }}</span>
            </button>
            
            <div class="dropdown-menu" *ngIf="userMenuOpen">
              <button class="dropdown-item" (click)="navigateToProfile()">
                👤 Profile
              </button>
              <button class="dropdown-item" (click)="navigateToOrders()">
                📦 Orders
              </button>
              <button class="dropdown-item" (click)="handleLogout()">
                🚪 Logout
              </button>
            </div>
          </div>
          
          <button class="mobile-menu-button" (click)="toggleMobileMenu()">
            <span *ngIf="!mobileMenuOpen">☰</span>
            <span *ngIf="mobileMenuOpen">✕</span>
          </button>
        </div>
      </div>
      
      <div class="mobile-menu" *ngIf="mobileMenuOpen">
        <a routerLink="/home" class="mobile-nav-link" (click)="closeMobileMenu()">
          🏠 Home
        </a>
        <a routerLink="/restaurants" class="mobile-nav-link" (click)="closeMobileMenu()">
          🏪 Restaurants
        </a>
        <a routerLink="/orders" class="mobile-nav-link" (click)="closeMobileMenu()">
          📦 Orders
        </a>
      </div>
    </header>
  `,
  styles: [`
    .header-container {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
      padding: 0 20px;
    }

    .header-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }

    .logo {
      font-size: 24px;
      font-weight: 700;
      color: #667eea;
      text-decoration: none;
    }

    .logo:hover {
      color: #764ba2;
    }

    .nav {
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #666;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
    }

    .nav-link:hover {
      color: #667eea;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .cart-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f8f9fa;
      color: #667eea;
      text-decoration: none;
      transition: all 0.3s ease;
      font-size: 18px;
    }

    .cart-button:hover {
      background: #667eea;
      color: white;
    }

    .cart-badge {
      position: absolute;
      top: -5px;
      right: -5px;
      background: #ff4757;
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
    }

    .user-menu {
      position: relative;
    }

    .user-button {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px 12px;
      border-radius: 8px;
      transition: background-color 0.3s ease;
    }

    .user-button:hover {
      background: #f8f9fa;
    }

    .user-name {
      font-weight: 500;
      color: #333;
    }

    .dropdown-menu {
      position: absolute;
      top: 100%;
      right: 0;
      background: white;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
      min-width: 180px;
      z-index: 1001;
      padding: 8px 0;
    }

    .dropdown-item {
      width: 100%;
      padding: 12px 16px;
      background: none;
      border: none;
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      color: #333;
      transition: background-color 0.3s ease;
    }

    .dropdown-item:hover {
      background: #f8f9fa;
    }

    .mobile-menu-button {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      font-size: 18px;
    }

    .mobile-menu {
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      padding: 20px;
      z-index: 999;
    }

    .mobile-nav-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 0;
      color: #666;
      text-decoration: none;
      font-weight: 500;
      border-bottom: 1px solid #eee;
    }

    .mobile-nav-link:last-child {
      border-bottom: none;
    }

    .mobile-nav-link:hover {
      color: #667eea;
    }

    @media (max-width: 768px) {
      .nav {
        display: none;
      }

      .mobile-menu-button {
        display: block;
      }

      .user-name {
        display: none;
      }
    }

    @media (min-width: 769px) {
      .mobile-menu {
        display: none;
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  
  currentUser: User | null = null;
  totalItems = 0;
  userMenuOpen = false;
  mobileMenuOpen = false;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Subscribe to current user
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.currentUser = user;
      });

    // Subscribe to cart items
    this.cartService.cartItems$
      .pipe(takeUntil(this.destroy$))
      .subscribe(items => {
        this.totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  navigateToProfile(): void {
    this.userMenuOpen = false;
    this.router.navigate(['/profile']);
  }

  navigateToOrders(): void {
    this.userMenuOpen = false;
    this.router.navigate(['/orders']);
  }

  handleLogout(): void {
    this.userMenuOpen = false;
    this.authService.logout();
  }
}