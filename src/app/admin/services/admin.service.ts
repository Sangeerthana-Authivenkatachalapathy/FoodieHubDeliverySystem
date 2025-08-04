import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface DashboardStats {
  totalOrders: number;
  activeRestaurants: number;
  deliveryPartners: number;
  totalRevenue: number;
}

export interface Order {
  id: string;
  customerName: string;
  restaurant: string;
  items: string[];
  amount: number;
  status: 'Pending' | 'Preparing' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  orderTime: Date;
  deliveryTime?: Date;
}

export interface Restaurant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cuisine: string;
  status: 'Active' | 'Inactive' | 'Suspended';
  rating: number;
  totalOrders: number;
  joinDate: Date;
}

export interface DeliveryPartner {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  zone: string;
  status: 'Active' | 'Inactive' | 'On Delivery' | 'Offline';
  rating: number;
  totalDeliveries: number;
  joinDate: Date;
}

export interface Feedback {
  id: string;
  customerName: string;
  orderId: string;
  restaurant: string;
  rating: number;
  comment: string;
  date: Date;
  status: 'New' | 'Reviewed' | 'Resolved';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'System' | 'Order' | 'Restaurant' | 'Delivery' | 'Customer';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'Read' | 'Dismissed';
  timestamp: Date;
  recipient?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = '/api/admin';

  constructor(private http: HttpClient) {}

  // Dashboard methods
  getDashboardStats(): Observable<DashboardStats> {
    // Simulate API call with mock data
    const mockStats: DashboardStats = {
      totalOrders: 1248,
      activeRestaurants: 156,
      deliveryPartners: 89,
      totalRevenue: 45670
    };
    return of(mockStats).pipe(delay(1000));
  }

  getRecentOrders(): Observable<Order[]> {
    const mockOrders: Order[] = [
      {
        id: '#1234',
        customerName: 'John Doe',
        restaurant: 'Pizza Palace',
        items: ['Margherita Pizza', 'Coke'],
        amount: 45.99,
        status: 'Delivered',
        orderTime: new Date('2024-01-15T14:30:00'),
        deliveryTime: new Date('2024-01-15T15:15:00')
      },
      {
        id: '#1235',
        customerName: 'Jane Smith',
        restaurant: 'Burger House',
        items: ['Cheese Burger', 'Fries'],
        amount: 32.50,
        status: 'Preparing',
        orderTime: new Date('2024-01-15T15:00:00')
      }
    ];
    return of(mockOrders).pipe(delay(1000));
  }

  // Orders methods
  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  updateOrderStatus(orderId: string, status: Order['status']): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/orders/${orderId}/status`, { status });
  }

  // Restaurants methods
  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/restaurants`);
  }

  updateRestaurantStatus(restaurantId: string, status: Restaurant['status']): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/restaurants/${restaurantId}/status`, { status });
  }

  approveRestaurant(restaurantId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/restaurants/${restaurantId}/approve`, {});
  }

  suspendRestaurant(restaurantId: string, reason: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/restaurants/${restaurantId}/suspend`, { reason });
  }

  // Delivery Partners methods
  getDeliveryPartners(): Observable<DeliveryPartner[]> {
    return this.http.get<DeliveryPartner[]>(`${this.baseUrl}/delivery-partners`);
  }

  updatePartnerStatus(partnerId: string, status: DeliveryPartner['status']): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/delivery-partners/${partnerId}/status`, { status });
  }

  assignPartnerToZone(partnerId: string, zone: string): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/delivery-partners/${partnerId}/zone`, { zone });
  }

  // Feedback methods
  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedbacks`);
  }

  updateFeedbackStatus(feedbackId: string, status: Feedback['status']): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/feedbacks/${feedbackId}/status`, { status });
  }

  respondToFeedback(feedbackId: string, response: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/feedbacks/${feedbackId}/respond`, { response });
  }

  // Notifications methods
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notifications`);
  }

  updateNotificationStatus(notificationId: string, status: Notification['status']): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/notifications/${notificationId}/status`, { status });
  }

  markAllNotificationsAsRead(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/notifications/mark-all-read`, {});
  }

  dismissAllNotifications(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/notifications/dismiss-all`, {});
  }

  createNotification(notification: Omit<Notification, 'id' | 'timestamp'>): Observable<Notification> {
    return this.http.post<Notification>(`${this.baseUrl}/notifications`, notification);
  }

  // Analytics methods
  getOrdersAnalytics(period: 'week' | 'month' | 'year'): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/orders?period=${period}`);
  }

  getRevenueAnalytics(period: 'week' | 'month' | 'year'): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/revenue?period=${period}`);
  }

  getRestaurantPerformance(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/restaurant-performance`);
  }

  getDeliveryMetrics(): Observable<any> {
    return this.http.get(`${this.baseUrl}/analytics/delivery-metrics`);
  }

  // Reports methods
  generateOrdersReport(dateRange: { startDate: Date; endDate: Date }): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/reports/orders`, dateRange, { 
      responseType: 'blob' 
    });
  }

  generateRevenueReport(dateRange: { startDate: Date; endDate: Date }): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/reports/revenue`, dateRange, { 
      responseType: 'blob' 
    });
  }

  generateRestaurantReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/reports/restaurants`, { 
      responseType: 'blob' 
    });
  }
}