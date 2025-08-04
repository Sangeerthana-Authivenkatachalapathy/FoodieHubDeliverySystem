import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isApproved: boolean;
  isActive: boolean;
  createdAt: string;
  address?: string;
  pincode?: string;
}

interface Restaurant {
  id: number;
  name: string;
  email: string;
  address: string;
  pincode: string;
  licenseNumber: string;
  isApproved: boolean;
  isActive: boolean;
  rating: number;
  totalOrders: number;
  revenue: number;
}

interface Order {
  id: string;
  customerId: number;
  customerName: string;
  restaurantId: number;
  restaurantName: string;
  deliveryPartnerId?: number;
  deliveryPartnerName?: string;
  status: string;
  totalAmount: number;
  orderDate: string;
  deliveryAddress: string;
  items: any[];
}

interface DeliveryPartner {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  vehicleType: string;
  vehicleNumber: string;
  isApproved: boolean;
  isActive: boolean;
  isOnline: boolean;
  rating: number;
  totalDeliveries: number;
  earnings: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-dashboard">
      <!-- Header -->
      <header class="admin-header">
        <div class="container">
          <h1 class="logo">👨‍💼 Admin Dashboard</h1>
          <div class="header-actions">
            <div class="admin-info">
              <span>Welcome, Admin</span>
              <i class="fas fa-user-circle"></i>
            </div>
            <button class="btn btn-secondary" (click)="logout()">
              <i class="fas fa-sign-out-alt"></i>
              Logout
            </button>
          </div>
        </div>
      </header>

      <div class="admin-container">
        <div class="container">
          <!-- Navigation Tabs -->
          <nav class="admin-nav">
            <button 
              class="nav-tab" 
              [class.active]="activeTab === 'overview'"
              (click)="setActiveTab('overview')"
            >
              <i class="fas fa-chart-pie"></i>
              Overview
            </button>
            <button 
              class="nav-tab" 
              [class.active]="activeTab === 'customers'"
              (click)="setActiveTab('customers')"
            >
              <i class="fas fa-users"></i>
              Customers
            </button>
            <button 
              class="nav-tab" 
              [class.active]="activeTab === 'restaurants'"
              (click)="setActiveTab('restaurants')"
            >
              <i class="fas fa-store"></i>
              Restaurants
            </button>
            <button 
              class="nav-tab" 
              [class.active]="activeTab === 'delivery'"
              (click)="setActiveTab('delivery')"
            >
              <i class="fas fa-motorcycle"></i>
              Delivery Partners
            </button>
            <button 
              class="nav-tab" 
              [class.active]="activeTab === 'orders'"
              (click)="setActiveTab('orders')"
            >
              <i class="fas fa-shopping-bag"></i>
              Orders
            </button>
            <button 
              class="nav-tab" 
              [class.active]="activeTab === 'analytics'"
              (click)="setActiveTab('analytics')"
            >
              <i class="fas fa-chart-bar"></i>
              Analytics
            </button>
          </nav>

          <!-- Overview Tab -->
          <div class="tab-content" *ngIf="activeTab === 'overview'">
            <div class="stats-grid">
              <div class="stat-card customers">
                <div class="stat-icon">
                  <i class="fas fa-users"></i>
                </div>
                <div class="stat-details">
                  <h3>{{totalCustomers}}</h3>
                  <p>Total Customers</p>
                  <span class="stat-change positive">+12% this month</span>
                </div>
              </div>
              
              <div class="stat-card restaurants">
                <div class="stat-icon">
                  <i class="fas fa-store"></i>
                </div>
                <div class="stat-details">
                  <h3>{{totalRestaurants}}</h3>
                  <p>Active Restaurants</p>
                  <span class="stat-change positive">+5% this month</span>
                </div>
              </div>
              
              <div class="stat-card delivery">
                <div class="stat-icon">
                  <i class="fas fa-motorcycle"></i>
                </div>
                <div class="stat-details">
                  <h3>{{totalDeliveryPartners}}</h3>
                  <p>Delivery Partners</p>
                  <span class="stat-change positive">+8% this month</span>
                </div>
              </div>
              
              <div class="stat-card orders">
                <div class="stat-icon">
                  <i class="fas fa-shopping-bag"></i>
                </div>
                <div class="stat-details">
                  <h3>{{totalOrders}}</h3>
                  <p>Total Orders</p>
                  <span class="stat-change positive">+15% this month</span>
                </div>
              </div>
              
              <div class="stat-card revenue">
                <div class="stat-icon">
                  <i class="fas fa-dollar-sign"></i>
                </div>
                <div class="stat-details">
                  <h3>₹{{totalRevenue | number}}</h3>
                  <p>Total Revenue</p>
                  <span class="stat-change positive">+18% this month</span>
                </div>
              </div>
              
              <div class="stat-card pending">
                <div class="stat-icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="stat-details">
                  <h3>{{pendingApprovals}}</h3>
                  <p>Pending Approvals</p>
                  <span class="stat-change negative">Needs attention</span>
                </div>
              </div>
            </div>

            <!-- Recent Activities -->
            <div class="recent-activities">
              <h3>Recent Activities</h3>
              <div class="activity-list">
                <div class="activity-item" *ngFor="let activity of recentActivities">
                  <div class="activity-icon" [ngClass]="activity.type">
                    <i [class]="activity.icon"></i>
                  </div>
                  <div class="activity-details">
                    <p>{{activity.description}}</p>
                    <span class="activity-time">{{activity.time}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Customers Tab -->
          <div class="tab-content" *ngIf="activeTab === 'customers'">
            <div class="section-header">
              <h2>Customer Management</h2>
              <div class="search-bar">
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search customers..."
                  [(ngModel)]="customerSearchTerm"
                  (input)="filterCustomers()"
                >
                <i class="fas fa-search"></i>
              </div>
            </div>

            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Joined</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let customer of filteredCustomers">
                    <td>#{{customer.id}}</td>
                    <td>{{customer.name}}</td>
                    <td>{{customer.email}}</td>
                    <td>{{customer.phoneNumber}}</td>
                    <td>{{customer.pincode}}</td>
                    <td>{{customer.createdAt}}</td>
                    <td>
                      <span class="status-badge" [class.active]="customer.isActive" [class.inactive]="!customer.isActive">
                        {{customer.isActive ? 'Active' : 'Inactive'}}
                      </span>
                    </td>
                    <td class="actions">
                      <button class="btn-icon" (click)="viewCustomerDetails(customer)" title="View Details">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="btn-icon" (click)="toggleCustomerStatus(customer)" 
                              [class.deactivate]="customer.isActive" title="Toggle Status">
                        <i class="fas fa-power-off"></i>
                      </button>
                      <button class="btn-icon delete" (click)="deleteCustomer(customer)" title="Delete">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Restaurants Tab -->
          <div class="tab-content" *ngIf="activeTab === 'restaurants'">
            <div class="section-header">
              <h2>Restaurant Management</h2>
              <div class="filter-controls">
                <select class="form-control" [(ngModel)]="restaurantFilter" (change)="filterRestaurants()">
                  <option value="all">All Restaurants</option>
                  <option value="pending">Pending Approval</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search restaurants..."
                  [(ngModel)]="restaurantSearchTerm"
                  (input)="filterRestaurants()"
                >
              </div>
            </div>

            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Restaurant Name</th>
                    <th>Email</th>
                    <th>Location</th>
                    <th>License</th>
                    <th>Rating</th>
                    <th>Orders</th>
                    <th>Revenue</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let restaurant of filteredRestaurants">
                    <td>#{{restaurant.id}}</td>
                    <td>{{restaurant.name}}</td>
                    <td>{{restaurant.email}}</td>
                    <td>{{restaurant.address}}, {{restaurant.pincode}}</td>
                    <td>{{restaurant.licenseNumber}}</td>
                    <td>
                      <div class="rating">
                        <i class="fas fa-star"></i>
                        {{restaurant.rating}}
                      </div>
                    </td>
                    <td>{{restaurant.totalOrders}}</td>
                    <td>₹{{restaurant.revenue | number}}</td>
                    <td>
                      <span class="status-badge" 
                            [class.approved]="restaurant.isApproved" 
                            [class.pending]="!restaurant.isApproved"
                            [class.inactive]="!restaurant.isActive">
                        {{restaurant.isApproved ? (restaurant.isActive ? 'Active' : 'Inactive') : 'Pending'}}
                      </span>
                    </td>
                    <td class="actions">
                      <button class="btn-icon" (click)="viewRestaurantDetails(restaurant)" title="View Details">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="btn-icon approve" *ngIf="!restaurant.isApproved" 
                              (click)="approveRestaurant(restaurant)" title="Approve">
                        <i class="fas fa-check"></i>
                      </button>
                      <button class="btn-icon reject" *ngIf="!restaurant.isApproved" 
                              (click)="rejectRestaurant(restaurant)" title="Reject">
                        <i class="fas fa-times"></i>
                      </button>
                      <button class="btn-icon" *ngIf="restaurant.isApproved" 
                              (click)="toggleRestaurantStatus(restaurant)" title="Toggle Status">
                        <i class="fas fa-power-off"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Delivery Partners Tab -->
          <div class="tab-content" *ngIf="activeTab === 'delivery'">
            <div class="section-header">
              <h2>Delivery Partner Management</h2>
              <div class="filter-controls">
                <select class="form-control" [(ngModel)]="deliveryFilter" (change)="filterDeliveryPartners()">
                  <option value="all">All Partners</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="pending">Pending Approval</option>
                </select>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search delivery partners..."
                  [(ngModel)]="deliverySearchTerm"
                  (input)="filterDeliveryPartners()"
                >
              </div>
            </div>

            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Vehicle</th>
                    <th>Rating</th>
                    <th>Deliveries</th>
                    <th>Earnings</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let partner of filteredDeliveryPartners">
                    <td>#{{partner.id}}</td>
                    <td>{{partner.name}}</td>
                    <td>{{partner.email}}</td>
                    <td>{{partner.phoneNumber}}</td>
                    <td>{{partner.vehicleType}} - {{partner.vehicleNumber}}</td>
                    <td>
                      <div class="rating">
                        <i class="fas fa-star"></i>
                        {{partner.rating}}
                      </div>
                    </td>
                    <td>{{partner.totalDeliveries}}</td>
                    <td>₹{{partner.earnings | number}}</td>
                    <td>
                      <span class="status-badge" 
                            [class.online]="partner.isOnline && partner.isApproved" 
                            [class.offline]="!partner.isOnline && partner.isApproved"
                            [class.pending]="!partner.isApproved">
                        {{!partner.isApproved ? 'Pending' : (partner.isOnline ? 'Online' : 'Offline')}}
                      </span>
                    </td>
                    <td class="actions">
                      <button class="btn-icon" (click)="viewDeliveryPartnerDetails(partner)" title="View Details">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="btn-icon approve" *ngIf="!partner.isApproved" 
                              (click)="approveDeliveryPartner(partner)" title="Approve">
                        <i class="fas fa-check"></i>
                      </button>
                      <button class="btn-icon reject" *ngIf="!partner.isApproved" 
                              (click)="rejectDeliveryPartner(partner)" title="Reject">
                        <i class="fas fa-times"></i>
                      </button>
                      <button class="btn-icon" *ngIf="partner.isApproved" 
                              (click)="toggleDeliveryPartnerStatus(partner)" title="Toggle Status">
                        <i class="fas fa-power-off"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Orders Tab -->
          <div class="tab-content" *ngIf="activeTab === 'orders'">
            <div class="section-header">
              <h2>Order Management</h2>
              <div class="filter-controls">
                <select class="form-control" [(ngModel)]="orderFilter" (change)="filterOrders()">
                  <option value="all">All Orders</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready for Pickup</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search orders..."
                  [(ngModel)]="orderSearchTerm"
                  (input)="filterOrders()"
                >
              </div>
            </div>

            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Restaurant</th>
                    <th>Delivery Partner</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let order of filteredOrders">
                    <td>#{{order.id}}</td>
                    <td>{{order.customerName}}</td>
                    <td>{{order.restaurantName}}</td>
                    <td>{{order.deliveryPartnerName || 'Not Assigned'}}</td>
                    <td>₹{{order.totalAmount}}</td>
                    <td>{{order.orderDate}}</td>
                    <td>
                      <span class="status-badge order-status" [ngClass]="order.status">
                        {{order.status | titlecase}}
                      </span>
                    </td>
                    <td class="actions">
                      <button class="btn-icon" (click)="viewOrderDetails(order)" title="View Details">
                        <i class="fas fa-eye"></i>
                      </button>
                      <button class="btn-icon" (click)="trackOrder(order)" title="Track Order">
                        <i class="fas fa-map-marker-alt"></i>
                      </button>
                      <button class="btn-icon cancel" *ngIf="order.status !== 'delivered' && order.status !== 'cancelled'" 
                              (click)="cancelOrder(order)" title="Cancel Order">
                        <i class="fas fa-ban"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Analytics Tab -->
          <div class="tab-content" *ngIf="activeTab === 'analytics'">
            <div class="analytics-dashboard">
              <h2>Analytics & Reports</h2>
              
              <div class="analytics-grid">
                <div class="analytics-card">
                  <h3>Revenue Trends</h3>
                  <div class="chart-placeholder">
                    <i class="fas fa-chart-line"></i>
                    <p>Revenue chart will be displayed here</p>
                  </div>
                </div>
                
                <div class="analytics-card">
                  <h3>Order Distribution</h3>
                  <div class="chart-placeholder">
                    <i class="fas fa-chart-pie"></i>
                    <p>Order distribution chart will be displayed here</p>
                  </div>
                </div>
                
                <div class="analytics-card">
                  <h3>Popular Restaurants</h3>
                  <div class="top-list">
                    <div class="top-item" *ngFor="let restaurant of topRestaurants; let i = index">
                      <span class="rank">#{{i + 1}}</span>
                      <span class="name">{{restaurant.name}}</span>
                      <span class="value">{{restaurant.orders}} orders</span>
                    </div>
                  </div>
                </div>
                
                <div class="analytics-card">
                  <h3>Top Delivery Partners</h3>
                  <div class="top-list">
                    <div class="top-item" *ngFor="let partner of topDeliveryPartners; let i = index">
                      <span class="rank">#{{i + 1}}</span>
                      <span class="name">{{partner.name}}</span>
                      <span class="value">{{partner.deliveries}} deliveries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      min-height: 100vh;
      background: #f5f6fa;
    }

    .admin-header {
      background: white;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    .admin-header .container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
    }

    .logo {
      font-size: 1.8rem;
      color: #8b5cf6;
      margin: 0;
      font-weight: 700;
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .admin-info {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #666;
      font-weight: 500;
    }

    .admin-info i {
      font-size: 1.5rem;
      color: #8b5cf6;
    }

    .admin-container {
      padding: 30px 0;
    }

    .admin-nav {
      display: flex;
      gap: 5px;
      margin-bottom: 30px;
      background: white;
      padding: 10px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      flex-wrap: wrap;
    }

    .nav-tab {
      background: none;
      border: none;
      padding: 15px 25px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
      color: #666;
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 150px;
      justify-content: center;
    }

    .nav-tab:hover {
      background: #f8f9fa;
      color: #8b5cf6;
    }

    .nav-tab.active {
      background: #8b5cf6;
      color: white;
    }

    .tab-content {
      background: white;
      border-radius: 12px;
      padding: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 25px;
      margin-bottom: 40px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 25px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      border-left: 4px solid;
    }

    .stat-card.customers { border-left-color: #ff6b6b; }
    .stat-card.restaurants { border-left-color: #4834d4; }
    .stat-card.delivery { border-left-color: #26de81; }
    .stat-card.orders { border-left-color: #fd79a8; }
    .stat-card.revenue { border-left-color: #fdcb6e; }
    .stat-card.pending { border-left-color: #e17055; }

    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      color: white;
    }

    .customers .stat-icon { background: #ff6b6b; }
    .restaurants .stat-icon { background: #4834d4; }
    .delivery .stat-icon { background: #26de81; }
    .orders .stat-icon { background: #fd79a8; }
    .revenue .stat-icon { background: #fdcb6e; }
    .pending .stat-icon { background: #e17055; }

    .stat-details h3 {
      margin: 0 0 5px 0;
      font-size: 2rem;
      font-weight: 700;
      color: #333;
    }

    .stat-details p {
      margin: 0 0 8px 0;
      color: #666;
      font-weight: 500;
    }

    .stat-change {
      font-size: 0.9rem;
      font-weight: 600;
    }

    .stat-change.positive { color: #26de81; }
    .stat-change.negative { color: #ff6b6b; }

    .recent-activities {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 25px;
    }

    .recent-activities h3 {
      margin-bottom: 20px;
      color: #333;
    }

    .activity-list {
      display: grid;
      gap: 15px;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 15px;
      background: white;
      border-radius: 8px;
    }

    .activity-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .activity-icon.user { background: #ff6b6b; }
    .activity-icon.restaurant { background: #4834d4; }
    .activity-icon.order { background: #26de81; }
    .activity-icon.delivery { background: #fd79a8; }

    .activity-details p {
      margin: 0 0 5px 0;
      color: #333;
      font-weight: 500;
    }

    .activity-time {
      color: #999;
      font-size: 0.9rem;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
      flex-wrap: wrap;
      gap: 20px;
    }

    .section-header h2 {
      margin: 0;
      color: #333;
      font-size: 1.8rem;
    }

    .search-bar,
    .filter-controls {
      display: flex;
      gap: 15px;
      align-items: center;
    }

    .search-bar {
      position: relative;
    }

    .search-bar i {
      position: absolute;
      right: 15px;
      top: 50%;
      transform: translateY(-50%);
      color: #999;
    }

    .form-control {
      padding: 12px 15px;
      border: 2px solid #e1e5e9;
      border-radius: 8px;
      font-size: 14px;
      min-width: 200px;
    }

    .form-control:focus {
      outline: none;
      border-color: #8b5cf6;
    }

    .data-table {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid #e1e5e9;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th, td {
      padding: 15px;
      text-align: left;
      border-bottom: 1px solid #e1e5e9;
    }

    th {
      background: #f8f9fa;
      font-weight: 600;
      color: #333;
    }

    tr:hover {
      background: #f8f9fa;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.active { background: #d4edda; color: #155724; }
    .status-badge.inactive { background: #f8d7da; color: #721c24; }
    .status-badge.approved { background: #d4edda; color: #155724; }
    .status-badge.pending { background: #fff3cd; color: #856404; }
    .status-badge.online { background: #d1ecf1; color: #0c5460; }
    .status-badge.offline { background: #f8d7da; color: #721c24; }

    .status-badge.order-status.pending { background: #fff3cd; color: #856404; }
    .status-badge.order-status.confirmed { background: #d1ecf1; color: #0c5460; }
    .status-badge.order-status.preparing { background: #ffeaa7; color: #6c5ce7; }
    .status-badge.order-status.ready { background: #a29bfe; color: white; }
    .status-badge.order-status.out_for_delivery { background: #fd79a8; color: white; }
    .status-badge.order-status.delivered { background: #00b894; color: white; }
    .status-badge.order-status.cancelled { background: #d63031; color: white; }

    .rating {
      display: flex;
      align-items: center;
      gap: 5px;
      color: #fdcb6e;
      font-weight: 600;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn-icon {
      background: none;
      border: none;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      color: #666;
    }

    .btn-icon:hover { background: #f8f9fa; color: #333; }
    .btn-icon.approve:hover { background: #d4edda; color: #155724; }
    .btn-icon.reject:hover { background: #f8d7da; color: #721c24; }
    .btn-icon.delete:hover { background: #f8d7da; color: #721c24; }
    .btn-icon.cancel:hover { background: #f8d7da; color: #721c24; }
    .btn-icon.deactivate:hover { background: #fff3cd; color: #856404; }

    .analytics-dashboard h2 {
      margin-bottom: 30px;
      color: #333;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 25px;
    }

    .analytics-card {
      background: #f8f9fa;
      border-radius: 12px;
      padding: 25px;
    }

    .analytics-card h3 {
      margin-bottom: 20px;
      color: #333;
    }

    .chart-placeholder {
      text-align: center;
      padding: 40px;
      color: #999;
    }

    .chart-placeholder i {
      font-size: 3rem;
      margin-bottom: 15px;
    }

    .top-list {
      display: grid;
      gap: 12px;
    }

    .top-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 12px;
      background: white;
      border-radius: 8px;
    }

    .rank {
      background: #8b5cf6;
      color: white;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .name {
      flex: 1;
      font-weight: 500;
      color: #333;
    }

    .value {
      color: #666;
      font-weight: 600;
    }

    @media (max-width: 768px) {
      .admin-nav {
        flex-direction: column;
      }
      
      .nav-tab {
        justify-content: flex-start;
        min-width: auto;
      }
      
      .section-header {
        flex-direction: column;
        align-items: flex-start;
      }
      
      .filter-controls {
        flex-direction: column;
        width: 100%;
      }
      
      .form-control {
        min-width: 100%;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .analytics-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  activeTab = 'overview';
  
  // Search and filter terms
  customerSearchTerm = '';
  restaurantSearchTerm = '';
  deliverySearchTerm = '';
  orderSearchTerm = '';
  restaurantFilter = 'all';
  deliveryFilter = 'all';
  orderFilter = 'all';

  // Statistics
  totalCustomers = 1250;
  totalRestaurants = 180;
  totalDeliveryPartners = 95;
  totalOrders = 5680;
  totalRevenue = 2850000;
  pendingApprovals = 12;

  // Mock data
  customers: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '9876543210', role: 'Customer', isApproved: true, isActive: true, createdAt: '2024-01-15', pincode: '123456' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '9876543211', role: 'Customer', isApproved: true, isActive: true, createdAt: '2024-01-16', pincode: '123457' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phoneNumber: '9876543212', role: 'Customer', isApproved: true, isActive: false, createdAt: '2024-01-17', pincode: '123458' }
  ];

  restaurants: Restaurant[] = [
    { id: 1, name: 'Pizza Palace', email: 'pizza@example.com', address: 'Downtown Street', pincode: '123456', licenseNumber: 'LIC001', isApproved: true, isActive: true, rating: 4.5, totalOrders: 250, revenue: 125000 },
    { id: 2, name: 'Burger Hub', email: 'burger@example.com', address: 'Main Street', pincode: '123457', licenseNumber: 'LIC002', isApproved: false, isActive: false, rating: 4.2, totalOrders: 180, revenue: 90000 },
    { id: 3, name: 'Sushi Express', email: 'sushi@example.com', address: 'Food Street', pincode: '123458', licenseNumber: 'LIC003', isApproved: true, isActive: true, rating: 4.7, totalOrders: 320, revenue: 160000 }
  ];

  deliveryPartners: DeliveryPartner[] = [
    { id: 1, name: 'Alex Kumar', email: 'alex@example.com', phoneNumber: '9876543220', vehicleType: 'Motorcycle', vehicleNumber: 'MH01AB1234', isApproved: true, isActive: true, isOnline: true, rating: 4.8, totalDeliveries: 450, earnings: 45000 },
    { id: 2, name: 'Raj Patel', email: 'raj@example.com', phoneNumber: '9876543221', vehicleType: 'Scooter', vehicleNumber: 'MH01CD5678', isApproved: false, isActive: false, isOnline: false, rating: 4.5, totalDeliveries: 320, earnings: 32000 },
    { id: 3, name: 'Sam Wilson', email: 'sam@example.com', phoneNumber: '9876543222', vehicleType: 'Bicycle', vehicleNumber: 'MH01EF9012', isApproved: true, isActive: true, isOnline: false, rating: 4.6, totalDeliveries: 280, earnings: 28000 }
  ];

  orders: Order[] = [
    { id: 'FH12345678', customerId: 1, customerName: 'John Doe', restaurantId: 1, restaurantName: 'Pizza Palace', deliveryPartnerId: 1, deliveryPartnerName: 'Alex Kumar', status: 'delivered', totalAmount: 850, orderDate: '2024-01-20', deliveryAddress: '123 Main St', items: [] },
    { id: 'FH12345679', customerId: 2, customerName: 'Jane Smith', restaurantId: 2, restaurantName: 'Burger Hub', status: 'preparing', totalAmount: 650, orderDate: '2024-01-20', deliveryAddress: '456 Oak Ave', items: [] },
    { id: 'FH12345680', customerId: 3, customerName: 'Mike Johnson', restaurantId: 3, restaurantName: 'Sushi Express', deliveryPartnerId: 3, deliveryPartnerName: 'Sam Wilson', status: 'out_for_delivery', totalAmount: 1200, orderDate: '2024-01-20', deliveryAddress: '789 Pine St', items: [] }
  ];

  recentActivities = [
    { type: 'user', icon: 'fas fa-user-plus', description: 'New customer John Doe registered', time: '5 minutes ago' },
    { type: 'restaurant', icon: 'fas fa-store', description: 'Restaurant Burger Hub requested approval', time: '15 minutes ago' },
    { type: 'order', icon: 'fas fa-shopping-bag', description: 'Order #FH12345680 was delivered successfully', time: '30 minutes ago' },
    { type: 'delivery', icon: 'fas fa-motorcycle', description: 'Delivery partner Alex Kumar went online', time: '1 hour ago' }
  ];

  topRestaurants = [
    { name: 'Pizza Palace', orders: 250 },
    { name: 'Sushi Express', orders: 220 },
    { name: 'Burger Hub', orders: 180 },
    { name: 'Indian Spice', orders: 160 },
    { name: 'Thai Garden', orders: 140 }
  ];

  topDeliveryPartners = [
    { name: 'Alex Kumar', deliveries: 450 },
    { name: 'Raj Patel', deliveries: 380 },
    { name: 'Sam Wilson', deliveries: 340 },
    { name: 'David Lee', deliveries: 320 },
    { name: 'Chris Brown', deliveries: 290 }
  ];

  // Filtered arrays
  filteredCustomers: User[] = [];
  filteredRestaurants: Restaurant[] = [];
  filteredDeliveryPartners: DeliveryPartner[] = [];
  filteredOrders: Order[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.initializeFilters();
  }

  initializeFilters() {
    this.filteredCustomers = [...this.customers];
    this.filteredRestaurants = [...this.restaurants];
    this.filteredDeliveryPartners = [...this.deliveryPartners];
    this.filteredOrders = [...this.orders];
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Customer management
  filterCustomers() {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.customerSearchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(this.customerSearchTerm.toLowerCase()) ||
      customer.phoneNumber.includes(this.customerSearchTerm)
    );
  }

  viewCustomerDetails(customer: User) {
    alert(`Customer Details:\nName: ${customer.name}\nEmail: ${customer.email}\nPhone: ${customer.phoneNumber}\nLocation: ${customer.pincode}`);
  }

  toggleCustomerStatus(customer: User) {
    customer.isActive = !customer.isActive;
    alert(`Customer ${customer.name} has been ${customer.isActive ? 'activated' : 'deactivated'}`);
  }

  deleteCustomer(customer: User) {
    if (confirm(`Are you sure you want to delete customer ${customer.name}?`)) {
      const index = this.customers.indexOf(customer);
      if (index > -1) {
        this.customers.splice(index, 1);
        this.filterCustomers();
        alert('Customer deleted successfully');
      }
    }
  }

  // Restaurant management
  filterRestaurants() {
    let filtered = [...this.restaurants];
    
    if (this.restaurantFilter !== 'all') {
      switch (this.restaurantFilter) {
        case 'pending':
          filtered = filtered.filter(r => !r.isApproved);
          break;
        case 'approved':
          filtered = filtered.filter(r => r.isApproved && r.isActive);
          break;
        case 'rejected':
          filtered = filtered.filter(r => r.isApproved && !r.isActive);
          break;
      }
    }
    
    if (this.restaurantSearchTerm) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(this.restaurantSearchTerm.toLowerCase()) ||
        restaurant.email.toLowerCase().includes(this.restaurantSearchTerm.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(this.restaurantSearchTerm.toLowerCase())
      );
    }
    
    this.filteredRestaurants = filtered;
  }

  viewRestaurantDetails(restaurant: Restaurant) {
    alert(`Restaurant Details:\nName: ${restaurant.name}\nEmail: ${restaurant.email}\nAddress: ${restaurant.address}\nLicense: ${restaurant.licenseNumber}\nRating: ${restaurant.rating}`);
  }

  approveRestaurant(restaurant: Restaurant) {
    restaurant.isApproved = true;
    restaurant.isActive = true;
    this.pendingApprovals--;
    alert(`Restaurant ${restaurant.name} has been approved`);
  }

  rejectRestaurant(restaurant: Restaurant) {
    if (confirm(`Are you sure you want to reject ${restaurant.name}?`)) {
      const index = this.restaurants.indexOf(restaurant);
      if (index > -1) {
        this.restaurants.splice(index, 1);
        this.filterRestaurants();
        this.pendingApprovals--;
        alert('Restaurant application rejected');
      }
    }
  }

  toggleRestaurantStatus(restaurant: Restaurant) {
    restaurant.isActive = !restaurant.isActive;
    alert(`Restaurant ${restaurant.name} has been ${restaurant.isActive ? 'activated' : 'deactivated'}`);
  }

  // Delivery partner management
  filterDeliveryPartners() {
    let filtered = [...this.deliveryPartners];
    
    if (this.deliveryFilter !== 'all') {
      switch (this.deliveryFilter) {
        case 'online':
          filtered = filtered.filter(d => d.isOnline && d.isApproved);
          break;
        case 'offline':
          filtered = filtered.filter(d => !d.isOnline && d.isApproved);
          break;
        case 'pending':
          filtered = filtered.filter(d => !d.isApproved);
          break;
      }
    }
    
    if (this.deliverySearchTerm) {
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(this.deliverySearchTerm.toLowerCase()) ||
        partner.email.toLowerCase().includes(this.deliverySearchTerm.toLowerCase()) ||
        partner.phoneNumber.includes(this.deliverySearchTerm)
      );
    }
    
    this.filteredDeliveryPartners = filtered;
  }

  viewDeliveryPartnerDetails(partner: DeliveryPartner) {
    alert(`Delivery Partner Details:\nName: ${partner.name}\nEmail: ${partner.email}\nPhone: ${partner.phoneNumber}\nVehicle: ${partner.vehicleType} - ${partner.vehicleNumber}\nRating: ${partner.rating}`);
  }

  approveDeliveryPartner(partner: DeliveryPartner) {
    partner.isApproved = true;
    partner.isActive = true;
    this.pendingApprovals--;
    alert(`Delivery partner ${partner.name} has been approved`);
  }

  rejectDeliveryPartner(partner: DeliveryPartner) {
    if (confirm(`Are you sure you want to reject ${partner.name}?`)) {
      const index = this.deliveryPartners.indexOf(partner);
      if (index > -1) {
        this.deliveryPartners.splice(index, 1);
        this.filterDeliveryPartners();
        this.pendingApprovals--;
        alert('Delivery partner application rejected');
      }
    }
  }

  toggleDeliveryPartnerStatus(partner: DeliveryPartner) {
    partner.isActive = !partner.isActive;
    alert(`Delivery partner ${partner.name} has been ${partner.isActive ? 'activated' : 'deactivated'}`);
  }

  // Order management
  filterOrders() {
    let filtered = [...this.orders];
    
    if (this.orderFilter !== 'all') {
      filtered = filtered.filter(order => order.status === this.orderFilter);
    }
    
    if (this.orderSearchTerm) {
      filtered = filtered.filter(order =>
        order.id.toLowerCase().includes(this.orderSearchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(this.orderSearchTerm.toLowerCase()) ||
        order.restaurantName.toLowerCase().includes(this.orderSearchTerm.toLowerCase())
      );
    }
    
    this.filteredOrders = filtered;
  }

  viewOrderDetails(order: Order) {
    alert(`Order Details:\nOrder ID: ${order.id}\nCustomer: ${order.customerName}\nRestaurant: ${order.restaurantName}\nAmount: ₹${order.totalAmount}\nStatus: ${order.status}\nDelivery Address: ${order.deliveryAddress}`);
  }

  trackOrder(order: Order) {
    alert(`Order ${order.id} tracking information will be displayed here`);
  }

  cancelOrder(order: Order) {
    if (confirm(`Are you sure you want to cancel order ${order.id}?`)) {
      order.status = 'cancelled';
      alert('Order cancelled successfully');
    }
  }

  logout() {
    this.router.navigate(['/welcome']);
  }
}