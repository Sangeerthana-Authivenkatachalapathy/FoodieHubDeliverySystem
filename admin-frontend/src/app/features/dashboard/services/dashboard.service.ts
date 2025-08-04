import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '@shared/constants/api-endpoints';

export interface DashboardSummary {
  totalUsers: number;
  totalRestaurants: number;
  totalOrders: number;
  totalDeliveryPartners: number;
  todayRevenue: number;
  monthlyRevenue: number;
  pendingApprovals: {
    restaurants: number;
    deliveryPartners: number;
  };
  activeOrders: number;
  completedOrdersToday: number;
  averageOrderValue: number;
  customerSatisfactionRate: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string;
    fill?: boolean;
  }[];
}

export interface RecentActivity {
  id: string;
  type: 'order' | 'user' | 'restaurant' | 'delivery_partner';
  title: string;
  description: string;
  timestamp: Date;
  status: string;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  /**
   * Get dashboard summary statistics
   * Implements: GetDashboardSummary
   */
  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(API_ENDPOINTS.DASHBOARD.SUMMARY);
  }

  /**
   * Get detailed statistics for charts
   */
  getStatistics(period: 'daily' | 'weekly' | 'monthly' | 'yearly' = 'monthly'): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.DASHBOARD.STATISTICS}?period=${period}`);
  }

  /**
   * Get recent activities
   */
  getRecentActivities(limit: number = 10): Observable<RecentActivity[]> {
    return this.http.get<RecentActivity[]>(`${API_ENDPOINTS.DASHBOARD.RECENT_ACTIVITIES}?limit=${limit}`);
  }

  /**
   * Get revenue chart data
   */
  getRevenueChart(period: 'daily' | 'weekly' | 'monthly' = 'monthly'): Observable<ChartData> {
    return this.http.get<ChartData>(`${API_ENDPOINTS.DASHBOARD.REVENUE_CHART}?period=${period}`);
  }

  /**
   * Get order analytics chart data
   */
  getOrderAnalytics(period: 'daily' | 'weekly' | 'monthly' = 'monthly'): Observable<ChartData> {
    return this.http.get<ChartData>(`${API_ENDPOINTS.DASHBOARD.ORDER_ANALYTICS}?period=${period}`);
  }

  /**
   * Get user growth chart data
   */
  getUserGrowthChart(period: 'monthly' | 'yearly' = 'monthly'): Observable<ChartData> {
    return this.http.get<ChartData>(`${API_ENDPOINTS.DASHBOARD.STATISTICS}/user-growth?period=${period}`);
  }

  /**
   * Get restaurant performance data
   */
  getRestaurantPerformance(): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.DASHBOARD.STATISTICS}/restaurant-performance`);
  }

  /**
   * Get delivery partner performance
   */
  getDeliveryPartnerPerformance(): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.DASHBOARD.STATISTICS}/delivery-performance`);
  }

  /**
   * Get peak hours data
   */
  getPeakHoursData(): Observable<ChartData> {
    return this.http.get<ChartData>(`${API_ENDPOINTS.DASHBOARD.STATISTICS}/peak-hours`);
  }

  /**
   * Get geographical distribution of orders
   */
  getGeographicalData(): Observable<any> {
    return this.http.get(`${API_ENDPOINTS.DASHBOARD.STATISTICS}/geographical`);
  }
}