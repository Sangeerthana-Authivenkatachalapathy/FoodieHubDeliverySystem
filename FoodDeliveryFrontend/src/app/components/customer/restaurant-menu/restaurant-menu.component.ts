import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  customizations?: Customization[];
}

interface Customization {
  id: number;
  name: string;
  options: CustomizationOption[];
  isRequired: boolean;
  maxSelections: number;
}

interface CustomizationOption {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  customizations: CustomizationOption[];
  totalPrice: number;
}

@Component({
  selector: 'app-restaurant-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="restaurant-menu">
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

      <!-- Restaurant Info -->
      <div class="restaurant-banner">
        <div class="container">
          <div class="restaurant-header">
            <div class="restaurant-details">
              <h2>{{restaurant.name}}</h2>
              <p class="cuisine">{{restaurant.cuisine}}</p>
              <div class="restaurant-meta">
                <span class="rating">
                  <i class="fas fa-star"></i>
                  {{restaurant.rating}} ({{restaurant.reviews}} reviews)
                </span>
                <span class="delivery-time">
                  <i class="fas fa-clock"></i>
                  {{restaurant.deliveryTime}} mins
                </span>
                <span class="delivery-fee" *ngIf="restaurant.deliveryFee > 0">
                  <i class="fas fa-motorcycle"></i>
                  ₹{{restaurant.deliveryFee}} delivery
                </span>
                <span class="free-delivery" *ngIf="restaurant.deliveryFee === 0">
                  <i class="fas fa-motorcycle"></i>
                  Free delivery
                </span>
              </div>
            </div>
            <img [src]="restaurant.image" [alt]="restaurant.name" class="restaurant-image">
          </div>
        </div>
      </div>

      <div class="menu-container">
        <div class="container">
          <div class="menu-layout">
            <!-- Category Navigation -->
            <aside class="category-nav">
              <h3>Menu Categories</h3>
              <ul class="category-list">
                <li 
                  *ngFor="let category of categories" 
                  class="category-item"
                  [class.active]="selectedCategory === category"
                  (click)="selectCategory(category)"
                >
                  {{category}}
                </li>
              </ul>
            </aside>

            <!-- Menu Items -->
            <main class="menu-content">
              <div class="category-section" *ngFor="let category of categories">
                <h3 class="category-title" [id]="category">{{category}}</h3>
                <div class="menu-items">
                  <div 
                    class="menu-item" 
                    *ngFor="let item of getItemsByCategory(category)"
                  >
                    <img [src]="item.image" [alt]="item.name" class="item-image">
                    <div class="item-details">
                      <div class="item-header">
                        <h4>{{item.name}}</h4>
                        <span class="veg-indicator" [class.non-veg]="!item.isVeg">
                          <i class="fas fa-circle"></i>
                        </span>
                      </div>
                      <p class="item-description">{{item.description}}</p>
                      <div class="item-footer">
                        <span class="item-price">₹{{item.price}}</span>
                        <button class="btn btn-primary" (click)="addToCart(item)">
                          <i class="fas fa-plus"></i>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      <!-- Customization Modal -->
      <div class="modal-overlay" *ngIf="showCustomizationModal" (click)="closeCustomizationModal()">
        <div class="customization-modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h3>Customize {{selectedItem?.name}}</h3>
            <button class="close-btn" (click)="closeCustomizationModal()">×</button>
          </div>
          <div class="modal-body">
            <div class="customization-section" *ngFor="let customization of selectedItem?.customizations">
              <h4>{{customization.name}} 
                <span class="required" *ngIf="customization.isRequired">(Required)</span>
              </h4>
              <div class="customization-options">
                <label 
                  class="option-label" 
                  *ngFor="let option of customization.options"
                >
                  <input 
                    type="checkbox" 
                    [value]="option.id"
                    (change)="toggleCustomization(customization, option, $event)"
                  >
                  <span class="option-name">{{option.name}}</span>
                  <span class="option-price" *ngIf="option.price > 0">+₹{{option.price}}</span>
                </label>
              </div>
            </div>
            
            <div class="quantity-section">
              <h4>Quantity</h4>
              <div class="quantity-controls">
                <button class="qty-btn" (click)="decreaseQuantity()">-</button>
                <span class="quantity">{{customizationQuantity}}</span>
                <button class="qty-btn" (click)="increaseQuantity()">+</button>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="total-price">
              Total: ₹{{calculateCustomizationTotal()}}
            </div>
            <button class="btn btn-primary" (click)="addCustomizedItemToCart()">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <!-- Floating Cart Button -->
      <button class="floating-cart-btn" *ngIf="cartItemCount > 0" (click)="viewCart()">
        <i class="fas fa-shopping-cart"></i>
        <span class="cart-count">{{cartItemCount}}</span>
        <span class="cart-total">₹{{cartTotal}}</span>
      </button>
    </div>
  `,
  styles: [`
    .restaurant-menu {
      min-height: 100vh;
      background: #f8f9fa;
      padding-bottom: 100px;
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

    .restaurant-banner {
      background: white;
      border-bottom: 1px solid #e1e5e9;
      padding: 30px 0;
    }

    .restaurant-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .restaurant-details h2 {
      font-size: 2.5rem;
      color: #333;
      margin-bottom: 10px;
    }

    .cuisine {
      color: #666;
      font-size: 1.1rem;
      margin-bottom: 15px;
    }

    .restaurant-meta {
      display: flex;
      gap: 30px;
      flex-wrap: wrap;
    }

    .restaurant-meta span {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .rating {
      color: #ff6b6b;
    }

    .delivery-time {
      color: #26de81;
    }

    .delivery-fee {
      color: #666;
    }

    .free-delivery {
      color: #26de81;
    }

    .restaurant-image {
      width: 150px;
      height: 150px;
      border-radius: 15px;
      object-fit: cover;
    }

    .menu-container {
      padding: 30px 0;
    }

    .menu-layout {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 40px;
    }

    .category-nav {
      position: sticky;
      top: 120px;
      height: fit-content;
      background: white;
      border-radius: 12px;
      padding: 25px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .category-nav h3 {
      margin-bottom: 20px;
      color: #333;
      font-size: 1.2rem;
    }

    .category-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .category-item {
      padding: 12px 15px;
      margin-bottom: 8px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: #666;
      font-weight: 500;
    }

    .category-item:hover,
    .category-item.active {
      background: #ff6b6b;
      color: white;
    }

    .menu-content {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .category-section {
      margin-bottom: 50px;
    }

    .category-title {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 25px;
      border-bottom: 2px solid #ff6b6b;
      padding-bottom: 10px;
    }

    .menu-items {
      display: grid;
      gap: 25px;
    }

    .menu-item {
      display: flex;
      gap: 20px;
      padding: 20px;
      border: 1px solid #e1e5e9;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .menu-item:hover {
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .item-image {
      width: 120px;
      height: 120px;
      border-radius: 10px;
      object-fit: cover;
    }

    .item-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 10px;
    }

    .item-header h4 {
      font-size: 1.3rem;
      color: #333;
      margin: 0;
    }

    .veg-indicator {
      color: #26de81;
      font-size: 0.8rem;
    }

    .veg-indicator.non-veg {
      color: #ff6b6b;
    }

    .item-description {
      color: #666;
      margin-bottom: 15px;
      line-height: 1.5;
      flex: 1;
    }

    .item-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .item-price {
      font-size: 1.2rem;
      font-weight: 600;
      color: #333;
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

    .customization-modal {
      background: white;
      border-radius: 12px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      animation: modalSlideIn 0.3s ease;
    }

    .modal-header {
      padding: 25px 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e1e5e9;
      margin-bottom: 25px;
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
    }

    .modal-body {
      padding: 0 30px;
    }

    .customization-section {
      margin-bottom: 25px;
    }

    .customization-section h4 {
      color: #333;
      margin-bottom: 15px;
    }

    .required {
      color: #ff6b6b;
      font-size: 0.9rem;
    }

    .customization-options {
      display: grid;
      gap: 10px;
    }

    .option-label {
      display: flex;
      align-items: center;
      padding: 10px;
      border: 1px solid #e1e5e9;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .option-label:hover {
      background: #f8f9fa;
    }

    .option-label input {
      margin-right: 12px;
    }

    .option-name {
      flex: 1;
    }

    .option-price {
      color: #26de81;
      font-weight: 600;
    }

    .quantity-section {
      margin-bottom: 25px;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .qty-btn {
      width: 40px;
      height: 40px;
      border: 2px solid #ff6b6b;
      background: white;
      color: #ff6b6b;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .qty-btn:hover {
      background: #ff6b6b;
      color: white;
    }

    .quantity {
      font-size: 1.2rem;
      font-weight: 600;
      min-width: 30px;
      text-align: center;
    }

    .modal-footer {
      padding: 25px 30px;
      border-top: 1px solid #e1e5e9;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .total-price {
      font-size: 1.3rem;
      font-weight: 600;
      color: #333;
    }

    .floating-cart-btn {
      position: fixed;
      bottom: 30px;
      right: 30px;
      background: #ff6b6b;
      color: white;
      border: none;
      border-radius: 50px;
      padding: 15px 25px;
      cursor: pointer;
      box-shadow: 0 8px 25px rgba(255, 107, 107, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 600;
      z-index: 1000;
    }

    .floating-cart-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 35px rgba(255, 107, 107, 0.4);
    }

    .cart-count {
      background: white;
      color: #ff6b6b;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.9rem;
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
      .restaurant-header {
        flex-direction: column;
        text-align: center;
        gap: 20px;
      }
      
      .restaurant-meta {
        justify-content: center;
      }
      
      .menu-layout {
        grid-template-columns: 1fr;
      }
      
      .category-nav {
        position: static;
        order: 1;
      }
      
      .menu-content {
        order: 2;
      }
      
      .menu-item {
        flex-direction: column;
        text-align: center;
      }
      
      .item-image {
        width: 100%;
        height: 200px;
      }
    }
  `]
})
export class RestaurantMenuComponent implements OnInit {
  restaurantId = '';
  cartItemCount = 0;
  cartTotal = 0;
  selectedCategory = '';
  categories: string[] = [];
  
  showCustomizationModal = false;
  selectedItem: MenuItem | null = null;
  customizationQuantity = 1;
  selectedCustomizations: CustomizationOption[] = [];

  restaurant = {
    id: 1,
    name: 'Pizza Palace',
    cuisine: 'Italian, Pizza, Fast Food',
    rating: 4.5,
    reviews: 1250,
    deliveryTime: 30,
    deliveryFee: 40,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop'
  };

  menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic pizza with fresh mozzarella, tomato sauce, and basil',
      price: 299,
      image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=300&h=200&fit=crop',
      category: 'Pizzas',
      isVeg: true,
      customizations: [
        {
          id: 1,
          name: 'Size',
          isRequired: true,
          maxSelections: 1,
          options: [
            { id: 1, name: 'Regular', price: 0 },
            { id: 2, name: 'Medium', price: 100 },
            { id: 3, name: 'Large', price: 200 }
          ]
        },
        {
          id: 2,
          name: 'Extra Toppings',
          isRequired: false,
          maxSelections: 3,
          options: [
            { id: 4, name: 'Extra Cheese', price: 50 },
            { id: 5, name: 'Mushrooms', price: 40 },
            { id: 6, name: 'Olives', price: 30 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      description: 'Delicious pizza topped with spicy pepperoni and mozzarella',
      price: 399,
      image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300&h=200&fit=crop',
      category: 'Pizzas',
      isVeg: false,
      customizations: [
        {
          id: 1,
          name: 'Size',
          isRequired: true,
          maxSelections: 1,
          options: [
            { id: 1, name: 'Regular', price: 0 },
            { id: 2, name: 'Medium', price: 100 },
            { id: 3, name: 'Large', price: 200 }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce with caesar dressing, croutons, and parmesan',
      price: 199,
      image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=200&fit=crop',
      category: 'Salads',
      isVeg: true
    },
    {
      id: 4,
      name: 'Garlic Bread',
      description: 'Crispy bread with garlic butter and herbs',
      price: 149,
      image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=300&h=200&fit=crop',
      category: 'Sides',
      isVeg: true
    },
    {
      id: 5,
      name: 'Chicken Wings',
      description: 'Spicy buffalo chicken wings with ranch dipping sauce',
      price: 249,
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=300&h=200&fit=crop',
      category: 'Sides',
      isVeg: false
    },
    {
      id: 6,
      name: 'Tiramisu',
      description: 'Classic Italian dessert with coffee-soaked ladyfingers',
      price: 179,
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=200&fit=crop',
      category: 'Desserts',
      isVeg: true
    },
    {
      id: 7,
      name: 'Coca Cola',
      description: 'Chilled soft drink',
      price: 45,
      image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300&h=200&fit=crop',
      category: 'Beverages',
      isVeg: true
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.restaurantId = params['id'];
    });
    
    // Extract unique categories
    this.categories = [...new Set(this.menuItems.map(item => item.category))];
    this.selectedCategory = this.categories[0];
  }

  getItemsByCategory(category: string): MenuItem[] {
    return this.menuItems.filter(item => item.category === category);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    document.getElementById(category)?.scrollIntoView({ behavior: 'smooth' });
  }

  addToCart(item: MenuItem) {
    if (item.customizations && item.customizations.length > 0) {
      this.selectedItem = item;
      this.customizationQuantity = 1;
      this.selectedCustomizations = [];
      this.showCustomizationModal = true;
    } else {
      // Add directly to cart
      this.cartItemCount++;
      this.cartTotal += item.price;
      // Here you would typically call a service to add to cart
    }
  }

  closeCustomizationModal() {
    this.showCustomizationModal = false;
    this.selectedItem = null;
    this.selectedCustomizations = [];
  }

  toggleCustomization(customization: Customization, option: CustomizationOption, event: any) {
    if (event.target.checked) {
      this.selectedCustomizations.push(option);
    } else {
      this.selectedCustomizations = this.selectedCustomizations.filter(c => c.id !== option.id);
    }
  }

  increaseQuantity() {
    this.customizationQuantity++;
  }

  decreaseQuantity() {
    if (this.customizationQuantity > 1) {
      this.customizationQuantity--;
    }
  }

  calculateCustomizationTotal(): number {
    if (!this.selectedItem) return 0;
    
    const basePrice = this.selectedItem.price;
    const customizationPrice = this.selectedCustomizations.reduce((total, custom) => total + custom.price, 0);
    return (basePrice + customizationPrice) * this.customizationQuantity;
  }

  addCustomizedItemToCart() {
    if (!this.selectedItem) return;
    
    const total = this.calculateCustomizationTotal();
    this.cartItemCount += this.customizationQuantity;
    this.cartTotal += total;
    
    // Here you would typically call a service to add customized item to cart
    this.closeCustomizationModal();
  }

  goBack() {
    this.router.navigate(['/restaurants', '123456']); // This should be dynamic based on stored pincode
  }

  goHome() {
    this.router.navigate(['/welcome']);
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}