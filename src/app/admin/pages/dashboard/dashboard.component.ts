import { Component, OnInit } from '@angular/core';

interface DashboardStats {
  totalOrders: number;
  activeRestaurants: number;
  deliveryPartners: number;
  totalRevenue: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  stats: DashboardStats = {
    totalOrders: 0,
    activeRestaurants: 0,
    deliveryPartners: 0,
    totalRevenue: 0
  };

  recentOrders: any[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    // Simulate API call
    setTimeout(() => {
      this.stats = {
        totalOrders: 1248,
        activeRestaurants: 156,
        deliveryPartners: 89,
        totalRevenue: 45670
      };

      this.recentOrders = [
        { id: '#1234', restaurant: 'Pizza Palace', amount: 45.99, status: 'Delivered' },
        { id: '#1235', restaurant: 'Burger House', amount: 32.50, status: 'Preparing' },
        { id: '#1236', restaurant: 'Sushi World', amount: 78.25, status: 'Out for Delivery' }
      ];

      this.loading = false;
    }, 1000);
  }
}