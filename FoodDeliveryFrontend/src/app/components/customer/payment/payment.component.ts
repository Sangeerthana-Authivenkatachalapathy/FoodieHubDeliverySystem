import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DeliveryAddress {
  id: number;
  type: string;
  address: string;
  pincode: string;
  isDefault: boolean;
}

interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  icon: string;
  details?: string;
}

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="payment-page">
      <!-- Header -->
      <header class="dashboard-header">
        <div class="container">
          <h1 class="logo" (click)="goHome()">🍕 FoodiHub</h1>
          <nav class="nav-menu">
            <button class="nav-btn" (click)="goBack()">
              <i class="fas fa-arrow-left"></i>
              Back to Cart
            </button>
          </nav>
        </div>
      </header>

      <div class="payment-container">
        <div class="container">
          <div class="payment-layout">
            <!-- Payment Form -->
            <main class="payment-content">
              <!-- Address Selection -->
              <div class="payment-section">
                <h3>
                  <i class="fas fa-map-marker-alt"></i>
                  Delivery Address
                </h3>
                <div class="address-list">
                  <div 
                    class="address-card" 
                    *ngFor="let address of deliveryAddresses"
                    [class.selected]="selectedAddressId === address.id"
                    (click)="selectAddress(address.id)"
                  >
                    <div class="address-header">
                      <span class="address-type">{{address.type}}</span>
                      <span class="default-badge" *ngIf="address.isDefault">Default</span>
                    </div>
                    <p class="address-text">{{address.address}}</p>
                    <span class="address-pincode">Pincode: {{address.pincode}}</span>
                  </div>
                  
                  <div class="add-address-card" (click)="addNewAddress()">
                    <i class="fas fa-plus"></i>
                    <span>Add New Address</span>
                  </div>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="payment-section">
                <h3>
                  <i class="fas fa-credit-card"></i>
                  Payment Method
                </h3>
                <div class="payment-methods">
                  <div 
                    class="payment-method-card" 
                    *ngFor="let method of paymentMethods"
                    [class.selected]="selectedPaymentMethod === method.id"
                    (click)="selectPaymentMethod(method.id)"
                  >
                    <div class="method-icon">
                      <i [class]="method.icon"></i>
                    </div>
                    <div class="method-details">
                      <h4>{{method.name}}</h4>
                      <p *ngIf="method.details">{{method.details}}</p>
                    </div>
                    <div class="method-selector">
                      <div class="radio-btn" [class.selected]="selectedPaymentMethod === method.id"></div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- DigiPin Verification for UPI/Cards -->
              <div class="payment-section" *ngIf="requiresDigiPin()">
                <h3>
                  <i class="fas fa-shield-alt"></i>
                  Security Verification
                </h3>
                <div class="digipin-verification">
                  <p>Enter your 4-digit DigiPin to authorize this payment</p>
                  <div class="digipin-input">
                    <input 
                      type="password" 
                      class="form-control"
                      [(ngModel)]="digiPin"
                      placeholder="Enter DigiPin"
                      maxlength="4"
                      pattern="[0-9]{4}"
                    >
                  </div>
                </div>
              </div>

              <!-- Special Instructions -->
              <div class="payment-section">
                <h3>
                  <i class="fas fa-comment"></i>
                  Special Instructions (Optional)
                </h3>
                <textarea 
                  class="form-control"
                  [(ngModel)]="specialInstructions"
                  placeholder="Any special instructions for the restaurant or delivery partner..."
                  rows="3"
                ></textarea>
              </div>

              <!-- Place Order Button -->
              <div class="place-order-section">
                <button 
                  class="btn btn-primary place-order-btn" 
                  (click)="placeOrder()"
                  [disabled]="!canPlaceOrder() || placingOrder"
                >
                  <i class="fas fa-spinner fa-spin" *ngIf="placingOrder"></i>
                  <i class="fas fa-check-circle" *ngIf="!placingOrder"></i>
                  <span *ngIf="!placingOrder">Place Order - ₹{{orderSummary.totalAmount}}</span>
                  <span *ngIf="placingOrder">Processing Order...</span>
                </button>
              </div>
            </main>

            <!-- Order Summary -->
            <aside class="order-summary">
              <div class="summary-card">
                <h3>Order Summary</h3>
                
                <!-- Order Items -->
                <div class="order-items">
                  <div class="order-item" *ngFor="let item of orderSummary.items">
                    <div class="item-info">
                      <span class="item-name">{{item.name}}</span>
                      <span class="item-quantity">x{{item.quantity}}</span>
                    </div>
                    <span class="item-price">₹{{item.totalPrice}}</span>
                  </div>
                </div>

                <hr>

                <!-- Cost Breakdown -->
                <div class="cost-breakdown">
                  <div class="cost-row">
                    <span>Subtotal</span>
                    <span>₹{{orderSummary.subtotal}}</span>
                  </div>
                  <div class="cost-row">
                    <span>Delivery Fee</span>
                    <span *ngIf="orderSummary.deliveryFee > 0">₹{{orderSummary.deliveryFee}}</span>
                    <span class="free-text" *ngIf="orderSummary.deliveryFee === 0">Free</span>
                  </div>
                  <div class="cost-row">
                    <span>Taxes & Fees</span>
                    <span>₹{{orderSummary.taxesAndFees}}</span>
                  </div>
                  <div class="cost-row" *ngIf="orderSummary.discount > 0">
                    <span>Discount</span>
                    <span class="discount-text">-₹{{orderSummary.discount}}</span>
                  </div>
                </div>

                <hr>

                <div class="total-row">
                  <span>Total Amount</span>
                  <span>₹{{orderSummary.totalAmount}}</span>
                </div>

                <!-- Delivery Time -->
                <div class="delivery-info">
                  <i class="fas fa-clock"></i>
                  <span>Estimated delivery: {{orderSummary.estimatedDeliveryTime}} mins</span>
                </div>

                <!-- Restaurant Info -->
                <div class="restaurant-info">
                  <h4>Ordering from</h4>
                  <div class="restaurant-details">
                    <span class="restaurant-name">{{orderSummary.restaurantName}}</span>
                    <span class="restaurant-address">{{orderSummary.restaurantAddress}}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <!-- Order Success Modal -->
      <div class="modal-overlay" *ngIf="orderPlaced" (click)="closeOrderModal()">
        <div class="success-modal" (click)="$event.stopPropagation()">
          <div class="success-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <h2>Order Placed Successfully!</h2>
          <p>Your order has been confirmed and is being prepared</p>
          <div class="order-details">
            <div class="detail-row">
              <span>Order ID:</span>
              <span class="order-id">#{{orderDetails.orderId}}</span>
            </div>
            <div class="detail-row">
              <span>Estimated Delivery:</span>
              <span>{{orderDetails.estimatedDelivery}} mins</span>
            </div>
            <div class="detail-row">
              <span>Total Amount:</span>
              <span>₹{{orderDetails.totalAmount}}</span>
            </div>
          </div>
          <div class="modal-actions">
            <button class="btn btn-primary" (click)="trackOrder()">
              <i class="fas fa-map-marker-alt"></i>
              Track Order
            </button>
            <button class="btn btn-secondary" (click)="goToHome()">
              <i class="fas fa-home"></i>
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-page {
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

    .payment-container {
      padding: 30px 0;
    }

    .payment-layout {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
    }

    .payment-section {
      background: white;
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .payment-section h3 {
      color: #333;
      margin-bottom: 25px;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .payment-section h3 i {
      color: #ff6b6b;
    }

    .address-list {
      display: grid;
      gap: 15px;
    }

    .address-card {
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .address-card:hover,
    .address-card.selected {
      border-color: #ff6b6b;
      background: #fff5f5;
    }

    .address-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
    }

    .address-type {
      font-weight: 600;
      color: #333;
      text-transform: uppercase;
      font-size: 0.9rem;
    }

    .default-badge {
      background: #26de81;
      color: white;
      padding: 4px 12px;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .address-text {
      color: #666;
      margin-bottom: 10px;
      line-height: 1.4;
    }

    .address-pincode {
      color: #999;
      font-size: 0.9rem;
    }

    .add-address-card {
      border: 2px dashed #ccc;
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #666;
    }

    .add-address-card:hover {
      border-color: #ff6b6b;
      color: #ff6b6b;
    }

    .add-address-card i {
      font-size: 1.5rem;
      margin-bottom: 10px;
      display: block;
    }

    .payment-methods {
      display: grid;
      gap: 15px;
    }

    .payment-method-card {
      border: 2px solid #e1e5e9;
      border-radius: 10px;
      padding: 20px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .payment-method-card:hover,
    .payment-method-card.selected {
      border-color: #ff6b6b;
      background: #fff5f5;
    }

    .method-icon {
      width: 50px;
      height: 50px;
      background: #f8f9fa;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: #ff6b6b;
    }

    .method-details {
      flex: 1;
    }

    .method-details h4 {
      margin: 0 0 5px 0;
      color: #333;
      font-size: 1.1rem;
    }

    .method-details p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .radio-btn {
      width: 20px;
      height: 20px;
      border: 2px solid #ccc;
      border-radius: 50%;
      position: relative;
      transition: all 0.3s ease;
    }

    .radio-btn.selected {
      border-color: #ff6b6b;
    }

    .radio-btn.selected::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background: #ff6b6b;
      border-radius: 50%;
    }

    .digipin-verification {
      text-align: center;
    }

    .digipin-verification p {
      color: #666;
      margin-bottom: 20px;
    }

    .digipin-input {
      max-width: 200px;
      margin: 0 auto;
    }

    .digipin-input .form-control {
      text-align: center;
      font-size: 1.5rem;
      letter-spacing: 0.5rem;
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

    .place-order-section {
      text-align: center;
      padding: 20px 0;
    }

    .place-order-btn {
      padding: 20px 40px;
      font-size: 1.2rem;
      font-weight: 600;
      min-width: 300px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
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

    .order-items {
      margin-bottom: 20px;
    }

    .order-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }

    .item-info {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .item-name {
      font-weight: 500;
      color: #333;
    }

    .item-quantity {
      font-size: 0.9rem;
      color: #666;
    }

    .item-price {
      font-weight: 600;
      color: #333;
    }

    .cost-breakdown {
      margin-bottom: 20px;
    }

    .cost-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }

    .cost-row span:first-child {
      color: #666;
    }

    .cost-row span:last-child {
      font-weight: 500;
      color: #333;
    }

    .free-text {
      color: #26de81 !important;
      font-weight: 600 !important;
    }

    .discount-text {
      color: #26de81 !important;
      font-weight: 600 !important;
    }

    .total-row {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      font-size: 1.2rem;
      color: #333;
      padding: 15px 0;
    }

    .delivery-info {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #26de81;
      margin: 20px 0;
      padding: 10px;
      background: #f0fdf4;
      border-radius: 8px;
    }

    .restaurant-info h4 {
      color: #333;
      margin-bottom: 10px;
      font-size: 1rem;
    }

    .restaurant-details {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .restaurant-name {
      font-weight: 600;
      color: #333;
    }

    .restaurant-address {
      color: #666;
      font-size: 0.9rem;
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

    .success-modal {
      background: white;
      border-radius: 20px;
      padding: 40px;
      max-width: 500px;
      width: 90%;
      text-align: center;
      animation: modalSlideIn 0.3s ease;
    }

    .success-icon {
      font-size: 4rem;
      color: #26de81;
      margin-bottom: 20px;
    }

    .success-modal h2 {
      color: #333;
      margin-bottom: 15px;
      font-size: 1.8rem;
    }

    .success-modal p {
      color: #666;
      margin-bottom: 30px;
      font-size: 1.1rem;
    }

    .order-details {
      background: #f8f9fa;
      border-radius: 10px;
      padding: 20px;
      margin-bottom: 30px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
    }

    .detail-row span:first-child {
      color: #666;
    }

    .detail-row span:last-child {
      font-weight: 600;
      color: #333;
    }

    .order-id {
      color: #ff6b6b !important;
      font-family: monospace;
    }

    .modal-actions {
      display: flex;
      gap: 15px;
    }

    .modal-actions .btn {
      flex: 1;
      padding: 15px;
      font-size: 1rem;
      font-weight: 600;
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
      .payment-layout {
        grid-template-columns: 1fr;
      }
      
      .order-summary {
        position: static;
        order: 1;
      }
      
      .payment-content {
        order: 2;
      }
      
      .place-order-btn {
        min-width: 100%;
      }
      
      .modal-actions {
        flex-direction: column;
      }
    }
  `]
})
export class PaymentComponent implements OnInit {
  selectedAddressId = 1;
  selectedPaymentMethod = 'upi';
  digiPin = '';
  specialInstructions = '';
  placingOrder = false;
  orderPlaced = false;

  deliveryAddresses: DeliveryAddress[] = [
    {
      id: 1,
      type: 'Home',
      address: '123 Main Street, Apartment 4B, Near City Mall, Downtown Area',
      pincode: '123456',
      isDefault: true
    },
    {
      id: 2,
      type: 'Office',
      address: '456 Business Park, Floor 8, Tech Tower, IT Sector',
      pincode: '123457',
      isDefault: false
    }
  ];

  paymentMethods: PaymentMethod[] = [
    {
      id: 'upi',
      type: 'digital',
      name: 'UPI Payment',
      icon: 'fas fa-mobile-alt',
      details: 'Pay using Google Pay, PhonePe, Paytm, etc.'
    },
    {
      id: 'card',
      type: 'digital',
      name: 'Credit/Debit Card',
      icon: 'fas fa-credit-card',
      details: 'Visa, Mastercard, RuPay cards accepted'
    },
    {
      id: 'netbanking',
      type: 'digital',
      name: 'Net Banking',
      icon: 'fas fa-university',
      details: 'Pay directly from your bank account'
    },
    {
      id: 'wallet',
      type: 'digital',
      name: 'Digital Wallet',
      icon: 'fas fa-wallet',
      details: 'Paytm, Amazon Pay, PayPal'
    },
    {
      id: 'cod',
      type: 'cash',
      name: 'Cash on Delivery',
      icon: 'fas fa-money-bill-wave',
      details: 'Pay when your order arrives'
    }
  ];

  orderSummary = {
    items: [
      { name: 'Margherita Pizza', quantity: 2, totalPrice: 698 },
      { name: 'Caesar Salad', quantity: 1, totalPrice: 199 },
      { name: 'Garlic Bread', quantity: 1, totalPrice: 149 }
    ],
    subtotal: 1046,
    deliveryFee: 0,
    taxesAndFees: 52,
    discount: 0,
    totalAmount: 1098,
    estimatedDeliveryTime: 35,
    restaurantName: 'Pizza Palace',
    restaurantAddress: 'Downtown Food Street, Near Central Mall'
  };

  orderDetails = {
    orderId: '',
    estimatedDelivery: 35,
    totalAmount: 1098
  };

  constructor(private router: Router) {}

  ngOnInit() {
    // Any initialization logic
  }

  selectAddress(addressId: number) {
    this.selectedAddressId = addressId;
  }

  selectPaymentMethod(methodId: string) {
    this.selectedPaymentMethod = methodId;
  }

  addNewAddress() {
    alert('Add new address functionality will be implemented in the backend integration');
  }

  requiresDigiPin(): boolean {
    return ['upi', 'card', 'netbanking', 'wallet'].includes(this.selectedPaymentMethod);
  }

  canPlaceOrder(): boolean {
    if (!this.selectedAddressId || !this.selectedPaymentMethod) return false;
    if (this.requiresDigiPin() && (!this.digiPin || this.digiPin.length !== 4)) return false;
    return true;
  }

  placeOrder() {
    if (!this.canPlaceOrder()) return;
    
    this.placingOrder = true;
    
    // Generate order ID
    this.orderDetails.orderId = 'FH' + Date.now().toString().slice(-8);
    
    // Simulate order placement API call
    setTimeout(() => {
      this.placingOrder = false;
      this.orderPlaced = true;
    }, 3000);
  }

  closeOrderModal() {
    this.orderPlaced = false;
    this.goToHome();
  }

  trackOrder() {
    alert('Order tracking functionality will be implemented in the backend integration');
    this.goToHome();
  }

  goToHome() {
    this.router.navigate(['/welcome']);
  }

  goBack() {
    this.router.navigate(['/cart']);
  }
}