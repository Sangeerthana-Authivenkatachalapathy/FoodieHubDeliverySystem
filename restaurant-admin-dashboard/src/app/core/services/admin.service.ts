import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Restaurant, RestaurantApplication } from '../models/restaurant.model';
import { ApiResponse, PaginationParams } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private apiService: ApiService) {}

  // Restaurant Applications Management
  getPendingRestaurants(params?: PaginationParams): Observable<ApiResponse<Restaurant[]>> {
    return this.apiService.get('/admin/restaurants/pending', params);
  }

  getApprovedRestaurants(params?: PaginationParams): Observable<ApiResponse<Restaurant[]>> {
    return this.apiService.get('/admin/restaurants/approved', params);
  }

  getRejectedRestaurants(params?: PaginationParams): Observable<ApiResponse<Restaurant[]>> {
    return this.apiService.get('/admin/restaurants/rejected', params);
  }

  getAllRestaurants(params?: PaginationParams): Observable<ApiResponse<Restaurant[]>> {
    return this.apiService.get('/admin/restaurants', params);
  }

  getRestaurantById(id: string): Observable<ApiResponse<Restaurant>> {
    return this.apiService.get(`/admin/restaurants/${id}`);
  }

  approveRestaurant(id: string, notes?: string): Observable<ApiResponse<Restaurant>> {
    return this.apiService.patch(`/admin/restaurants/${id}/approve`, { notes });
  }

  rejectRestaurant(id: string, reason: string, notes?: string): Observable<ApiResponse<Restaurant>> {
    return this.apiService.patch(`/admin/restaurants/${id}/reject`, { reason, notes });
  }

  updateRestaurant(id: string, data: Partial<Restaurant>): Observable<ApiResponse<Restaurant>> {
    return this.apiService.put(`/admin/restaurants/${id}`, data);
  }

  deleteRestaurant(id: string): Observable<ApiResponse<any>> {
    return this.apiService.delete(`/admin/restaurants/${id}`);
  }

  // Document Management
  downloadDocument(restaurantId: string, documentType: string): Observable<Blob> {
    return this.apiService.get(`/admin/restaurants/${restaurantId}/documents/${documentType}`);
  }

  // Statistics and Analytics
  getDashboardStats(): Observable<ApiResponse<any>> {
    return this.apiService.get('/admin/dashboard/stats');
  }

  getRestaurantStats(period: string = '30d'): Observable<ApiResponse<any>> {
    return this.apiService.get('/admin/dashboard/restaurant-stats', { period });
  }

  getApplicationTrends(period: string = '30d'): Observable<ApiResponse<any>> {
    return this.apiService.get('/admin/dashboard/application-trends', { period });
  }

  // Bulk Operations
  bulkApproveRestaurants(ids: string[], notes?: string): Observable<ApiResponse<any>> {
    return this.apiService.post('/admin/restaurants/bulk/approve', { ids, notes });
  }

  bulkRejectRestaurants(ids: string[], reason: string, notes?: string): Observable<ApiResponse<any>> {
    return this.apiService.post('/admin/restaurants/bulk/reject', { ids, reason, notes });
  }

  bulkDeleteRestaurants(ids: string[]): Observable<ApiResponse<any>> {
    return this.apiService.post('/admin/restaurants/bulk/delete', { ids });
  }

  // Search and Filtering
  searchRestaurants(query: string, filters?: any): Observable<ApiResponse<Restaurant[]>> {
    return this.apiService.get('/admin/restaurants/search', { 
      q: query, 
      ...filters 
    });
  }

  // Export Data
  exportRestaurants(format: 'csv' | 'excel', filters?: any): Observable<Blob> {
    return this.apiService.get('/admin/restaurants/export', { 
      format, 
      ...filters 
    });
  }

  // Admin User Management
  getAdminUsers(): Observable<ApiResponse<any[]>> {
    return this.apiService.get('/admin/users');
  }

  createAdminUser(userData: any): Observable<ApiResponse<any>> {
    return this.apiService.post('/admin/users', userData);
  }

  updateAdminUser(id: string, userData: any): Observable<ApiResponse<any>> {
    return this.apiService.put(`/admin/users/${id}`, userData);
  }

  deleteAdminUser(id: string): Observable<ApiResponse<any>> {
    return this.apiService.delete(`/admin/users/${id}`);
  }

  // System Settings
  getSystemSettings(): Observable<ApiResponse<any>> {
    return this.apiService.get('/admin/settings');
  }

  updateSystemSettings(settings: any): Observable<ApiResponse<any>> {
    return this.apiService.put('/admin/settings', settings);
  }

  // Activity Logs
  getActivityLogs(params?: PaginationParams): Observable<ApiResponse<any[]>> {
    return this.apiService.get('/admin/activity-logs', params);
  }
}