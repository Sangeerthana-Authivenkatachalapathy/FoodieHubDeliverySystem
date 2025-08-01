import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  customizations: string[];
  totalPrice: number;
  restaurantName: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="cart-page">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="container">
          <h1 class="logo" (click)="goHome()">🍕 FoodiHub</h1>
          <nav class="nav-menu">
            <button class="nav-btn" (click)="goBack()">
              <i class="fas fa-arrow-left"></i>
              Back
            </button>
          </nav>
        </div>
      </header>

      <div class="cart-container">
        <div class="container">
          <div class="cart-layout">
            <!-- Cart Items -->
            <main class="cart-content">
              <h2>Your Cart</h2>
              
              <!-- Empty Cart State -->
              <div class="empty-cart" *ngIf="cartItems.length === 0">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some delicious food to get started!</p>
                <button class="btn btn-primary" (click)="continueShopping()">
                  Continue Shopping
                </button>
              </div>

              <!-- Cart Items -->
              <div class="cart-items" *ngIf="cartItems.length > 0">
                <div class="cart-item" *ngFor="let item of cartItems; trackBy: trackByItemId">
                  <img [src]="item.image" [alt]="item.name" class="item-image">
                  <div class="item-details">
                    <div class="item-header">
                      <h4>{{item.name}}</h4>
                      <span class="restaurant-name">from {{item.restaurantName}}</span>
                    </div>
                    <p class="item-description">{{item.description}}</p>
                    
                    <!-- Customizations -->
                    <div class="customizations" *ngIf="item.customizations.length > 0">
                      <h5>Customizations:</h5>
                      <ul class="customization-list">
                        <li *ngFor="let customization of item.customizations">{{customization}}</li>
                      </ul>
                    </div>
                    
                    <div class="item-footer">
                      <div class="quantity-controls">
                        <button class="qty-btn" (click)="decreaseQuantity(item)" [disabled]="item.quantity <= 1">
                          <i class="fas fa-minus"></i>
                        </button>
                        <span class="quantity">{{item.quantity}}</span>
                        <button class="qty-btn" (click)="increaseQuantity(item)">
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                      <div class="item-pricing">
                        <span class="unit-price">₹{{item.price}} each</span>
                        <span class="total-price">₹{{item.totalPrice}}</span>
                      </div>
                      <button class="remove-btn" (click)="removeItem(item)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Continue Shopping -->
              <div class="continue-shopping" *ngIf="cartItems.length > 0">
                <button class="btn btn-secondary" (click)="continueShopping()">
                  <i class="fas fa-plus"></i>
                  Add More Items
                </button>
              </div>
            </main>

            <!-- Order Summary -->
            <aside class="order-summary" *ngIf="cartItems.length > 0">
              <div class="summary-card">
                <h3>Order Summary</h3>
                
                <div class="summary-details">
                  <div class="summary-row">
                    <span>Subtotal ({{totalItems}} items)</span>
                    <span>₹{{subtotal}}</span>
                  </div>
                  <div class="summary-row">
                    <span>Delivery Fee</span>
                    <span class="delivery-fee" *ngIf="deliveryFee > 0">₹{{deliveryFee}}</span>
                    <span class="free-delivery" *ngIf="deliveryFee === 0">Free</span>
                  </div>
                  <div class="summary-row">
                    <span>Taxes & Fees</span>
                    <span>₹{{taxesAndFees}}</span>
                  </div>
                  <hr>
                  <div class="summary-row total-row">
                    <span>Total</span>
                    <span>₹{{totalAmount}}</span>
                  </div>
                </div>

                <div class="delivery-time">
                  <i class="fas fa-clock"></i>
                  <span>Estimated delivery: {{estimatedDeliveryTime}} mins</span>
                </div>

                <button class="btn btn-primary checkout-btn" (click)="proceedToCheckout()">
                  <i class="fas fa-credit-card"></i>
                  Proceed to Checkout
                </button>

                <div class="promo-section">
                  <h4>Have a promo code?</h4>
                  <div class="promo-input">
                    <input type="text" placeholder="Enter promo code" [(ngModel)]="promoCode">
                    <button class="btn btn-secondary" (click)="applyPromoCode()">Apply</button>
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
    .cart-page {
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

    .cart-container {
      padding: 30px 0;
    }

    .cart-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
    }

    .cart-content h2 {
      color: #333;
      margin-bottom: 30px;
      font-size: 2rem;
    }

    .empty-cart {
      text-align: center;
      padding: 80px 20px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .empty-cart i {
      font-size: 4rem;
      color: #ccc;
      margin-bottom: 20px;
    }

    .empty-cart h3 {
      color: #333;
      margin-bottom: 10px;
      font-size: 1.5rem;
    }

    .empty-cart p {
      color: #666;
      margin-bottom: 30px;
    }

    .cart-items {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }

    .cart-item {
      display: flex;
      gap: 20px;
      padding: 25px 0;
      border-bottom: 1px solid #e1e5e9;
    }

    .cart-item:last-child {
      border-bottom: none;
    }

    .item-image {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      object-fit: cover;
    }

    .item-details {
      flex: 1;
    }

    .item-header {
      margin-bottom: 8px;
    }

    .item-header h4 {
      color: #333;
      margin: 0 0 5px 0;
      font-size: 1.3rem;
    }

    .restaurant-name {
      color: #666;
      font-size: 0.9rem;
      font-style: italic;
    }

    .item-description {
      color: #666;
      margin-bottom: 15px;
      font-size: 0.95rem;
    }

    .customizations {
      margin-bottom: 15px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .customizations h5 {
      color: #333;
      margin-bottom: 8px;
      font-size: 0.9rem;
    }

    .customization-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .customization-list li {
      color: #666;
      font-size: 0.85rem;
      padding: 2px 0;
    }

    .customization-list li:before {
      content: "• ";
      color: #ff6b6b;
      margin-right: 5px;
    }

    .item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 20px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .qty-btn {
      width: 35px;
      height: 35px;
      border: 2px solid #ff6b6b;
      background: white;
      color: #ff6b6b;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
    }

    .qty-btn:hover:not(:disabled) {
      background: #ff6b6b;
      color: white;
    }

    .qty-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .quantity {
      font-weight: 600;
      min-width: 20px;
      text-align: center;
    }

    .item-pricing {
      text-align: right;
    }

    .unit-price {
      display: block;
      color: #666;
      font-size: 0.9rem;
    }

    .total-price {
      display: block;
      font-weight: 600;
      color: #333;
      font-size: 1.1rem;
    }

    .remove-btn {
      background: none;
      border: none;
      color: #ff6b6b;
      cursor: pointer;
      padding: 8px;
      border-radius: 50%;
      transition: all 0.3s ease;
    }

    .remove-btn:hover {
      background: #ff6b6b;
      color: white;
    }

    .continue-shopping {
      text-align: center;
      padding: 20px;
    }

    .order-summary {
      position: sticky;
      top: 120px;
      height: fit-content;
    }

    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .summary-card h3 {
      color: #333;
      margin-bottom: 25px;
      font-size: 1.4rem;
    }

    .summary-details {
      margin-bottom: 25px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
    }

    .summary-row span:first-child {
      color: #666;
    }

    .summary-row span:last-child {
      font-weight: 500;
      color: #333;
    }

    .delivery-fee {
      color: #333;
    }

    .free-delivery {
      color: #26de81;
      font-weight: 600;
    }

    .total-row {
      font-weight: 600;
      font-size: 1.2rem;
      color: #333;
    }

    .delivery-time {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #26de81;
      margin-bottom: 25px;
      padding: 10px;
      background: #f0fdf4;
      border-radius: 8px;
    }

    .checkout-btn {
      width: 100%;
      padding: 15px;
      font-size: 1.1rem;
      margin-bottom: 25px;
    }

    .promo-section h4 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1rem;
    }

    .promo-input {
      display: flex;
      gap: 10px;
    }

    .promo-input input {
      flex: 1;
      padding: 10px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 0.9rem;
    }

    .promo-input input:focus {
      outline: none;
      border-color: #ff6b6b;
    }

    .promo-input .btn {
      padding: 10px 20px;
      font-size: 0.9rem;
    }

    @media (max-width: 768px) {
      .cart-layout {
        grid-template-columns: 1fr;
      }
      
      .order-summary {
        position: static;
        order: 1;
      }
      
      .cart-content {
        order: 2;
      }
      
      .cart-item {
        flex-direction: column;
        gap: 15px;
      }
      
      .item-image {
        width: 100%;
        height: 200px;
      }
      
      .item-footer {
        flex-wrap: wrap;
        gap: 15px;
      }
      
      .promo-input {
        flex-direction: column;
      }
    }
  `]
})
export class CartComponent implements OnInit {
  promoCode = '';
  
  cartItems: CartItem[] = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
      price: 299,
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&h=200&fit=crop',
      quantity: 2,
      customizations: ['Medium Size', 'Extra Cheese', 'Mushrooms'],
      totalPrice: 698,
      restaurantName: 'Pizza Palace'
    },
    {
      id: 2,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with caesar dressing, croutons, and parmesan',
      price: 199,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop',
      quantity: 1,
      customizations: [],
      totalPrice: 199,
      restaurantName: 'Pizza Palace'
    },
    {
      id: 3,
      name: 'Garlic Bread',
      description: 'Crispy bread with garlic butter and herbs',
      price: 149,
      image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=300&h=200&fit=crop',
      quantity: 1,
      customizations: [],
      totalPrice: 149,
      restaurantName: 'Pizza Palace'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.calculateTotals();
  }

  get totalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.totalPrice, 0);
  }

  get deliveryFee(): number {
    return this.subtotal >= 500 ? 0 : 40; // Free delivery above ₹500
  }

  get taxesAndFees(): number {
    return Math.round(this.subtotal * 0.05); // 5% taxes
  }

  get totalAmount(): number {
    return this.subtotal + this.deliveryFee + this.taxesAndFees;
  }

  get estimatedDeliveryTime(): number {
    return 35; // Static for now, could be dynamic based on restaurant
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id;
  }

  increaseQuantity(item: CartItem) {
    item.quantity++;
    item.totalPrice = item.price * item.quantity;
    this.calculateTotals();
  }

  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
      item.totalPrice = item.price * item.quantity;
      this.calculateTotals();
    }
  }

  removeItem(item: CartItem) {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.calculateTotals();
    }
  }

  calculateTotals() {
    // This method can be used to recalculate totals if needed
    // Currently, totals are calculated via getters
  }

  applyPromoCode() {
    if (this.promoCode.trim()) {
      // Here you would typically call a service to validate and apply the promo code
      alert('Promo code functionality will be implemented in the backend integration');
    }
  }

  proceedToCheckout() {
    // Check if user is logged in, if not redirect to register
    this.router.navigate(['/register']);
  }

  continueShopping() {
    this.router.navigate(['/restaurants', '123456']); // This should be dynamic
  }

  goBack() {
    this.router.navigate(['/restaurants', '123456']); // This should be dynamic
  }

  goHome() {
    this.router.navigate(['/welcome']);
  }
}