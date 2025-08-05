import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  loading = true;
  stats = {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  };
  
  recentApplications: any[] = [];
  applicationTrends: any[] = [];
  currentUser: any;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadDashboardData();
  }

  private loadDashboardData(): void {
    this.loading = true;
    
    // Load dashboard statistics
    this.adminService.getDashboardStats().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.stats = response.data;
        }
      },
      error: (error) => {
        console.error('Failed to load dashboard stats:', error);
      }
    });

    // Load recent applications
    this.adminService.getAllRestaurants({ page: 1, limit: 5, sortBy: 'submittedAt', sortOrder: 'desc' }).subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.recentApplications = response.data;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to load recent applications:', error);
        this.loading = false;
      }
    });

    // Load application trends
    this.adminService.getApplicationTrends().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.applicationTrends = response.data;
        }
      },
      error: (error) => {
        console.error('Failed to load application trends:', error);
      }
    });
  }

  navigateTo(route: string): void {
    this.router.navigate([`/admin/${route}`]);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending': return '#ff9800';
      case 'approved': return '#4caf50';
      case 'rejected': return '#f44336';
      default: return '#666';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'pending': return 'schedule';
      case 'approved': return 'check_circle';
      case 'rejected': return 'cancel';
      default: return 'info';
    }
  }

  logout(): void {
    this.authService.logout();
  }

  refreshData(): void {
    this.loadDashboardData();
  }
}