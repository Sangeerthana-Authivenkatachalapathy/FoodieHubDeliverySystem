import { Component, OnInit } from '@angular/core';
import { AdminService, DashboardSummary } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  dashboardSummary: DashboardSummary | null = null;
  isLoading = true;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.isLoading = true;
    
    this.adminService.getDashboardSummary().subscribe({
      next: (summary) => {
        this.dashboardSummary = summary;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard data:', error);
        this.isLoading = false;
        // Load mock data for demo
        this.loadMockData();
      }
    });
  }

  private loadMockData(): void {
    // Mock data for demonstration
    this.dashboardSummary = {
      totalUsers: 1250,
      totalRestaurants: 85,
      totalOrders: 3420,
      totalDeliveryPartners: 150,
      todayRevenue: 15420.50,
      monthlyRevenue: 425000.00,
      pendingApprovals: {
        restaurants: 12,
        deliveryPartners: 8
      },
      activeOrders: 45,
      completedOrdersToday: 128,
      averageOrderValue: 24.50,
      customerSatisfactionRate: 4.2
    };
  }

  getStatsCards() {
    if (!this.dashboardSummary) return [];

    return [
      {
        title: 'Total Users',
        value: this.dashboardSummary.totalUsers.toLocaleString(),
        icon: 'people',
        color: 'primary' as const,
        trend: { value: 12, isPositive: true, label: 'from last month' }
      },
      {
        title: 'Total Orders',
        value: this.dashboardSummary.totalOrders.toLocaleString(),
        icon: 'receipt_long',
        color: 'success' as const,
        trend: { value: 8, isPositive: true, label: 'from last week' }
      },
      {
        title: 'Restaurants',
        value: this.dashboardSummary.totalRestaurants.toLocaleString(),
        icon: 'restaurant',
        color: 'accent' as const,
        subtitle: `${this.dashboardSummary.pendingApprovals.restaurants} pending approval`
      },
      {
        title: 'Today Revenue',
        value: `$${this.dashboardSummary.todayRevenue.toLocaleString()}`,
        icon: 'attach_money',
        color: 'success' as const,
        trend: { value: 5, isPositive: true, label: 'from yesterday' }
      },
      {
        title: 'Active Orders',
        value: this.dashboardSummary.activeOrders.toLocaleString(),
        icon: 'local_shipping',
        color: 'warn' as const,
        clickable: true
      },
      {
        title: 'Delivery Partners',
        value: this.dashboardSummary.totalDeliveryPartners.toLocaleString(),
        icon: 'delivery_dining',
        color: 'info' as const,
        subtitle: `${this.dashboardSummary.pendingApprovals.deliveryPartners} pending approval`
      }
    ];
  }
}