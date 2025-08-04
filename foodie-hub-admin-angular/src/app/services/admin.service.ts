import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// DTOs matching the backend
export interface DashboardSummaryDTO {
  totalUsers: number;
  totalCustomers: number;
  totalRestaurants: number;
  totalDeliveryPartners: number;
  pendingRestaurantApprovals: number;
  pendingDeliveryPartnerApprovals: number;
  totalOrdersToday: number;
  totalRevenueToday: number;
  activeOrders: number;
  unresolvedFeedbacks: number;
  lastUpdated: Date;
}

export interface UserManagementDTO {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isApproved: boolean;
  isActive: boolean;
  createdDate: Date;
  lastLoginDate?: Date;
  totalOrders: number;
}

export interface RestaurantApprovalDTO {
  restaurantId: number;
  restaurantName: string;
  ownerName: string;
  ownerEmail: string;
  licenseNumber: string;
  address: string;
  city: string;
  pincode: string;
  licenseCertification: string;
  applicationDate: Date;
  isApproved: boolean;
  rejectionReason?: string;
}

export interface DeliveryPartnerApprovalDTO {
  deliveryPartnerId: number;
  partnerName: string;
  email: string;
  phoneNumber: string;
  vehicleType: string;
  licenseNumber: string;
  governmentIdNumber: string;
  governmentIdUrl: string;
  licenseDocumentUrl: string;
  applicationDate: Date;
  isApproved: boolean;
  rejectionReason?: string;
}

export interface AdminOrderDTO {
  orderId: number;
  customerName: string;
  customerEmail: string;
  restaurantName: string;
  deliveryPartnerName: string;
  totalAmount: number;
  status: string;
  orderDate: Date;
  estimatedDeliveryTime?: Date;
  deliveryAddress: string;
  orderItems: any[];
}

export interface FeedbackDTO {
  id: number;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  category: string;
  rating: number;
  createdAt: Date;
  isResolved: boolean;
  adminResponse?: string;
  responseDate?: Date;
  respondedByAdminName?: string;
  orderId?: number;
  restaurantId?: number;
  restaurantName?: string;
}

export interface NotificationDTO {
  id: number;
  title: string;
  message: string;
  notificationType: string;
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
  relatedEntityId?: string;
  userName: string;
  userEmail: string;
}

export interface FinancialReportDTO {
  reportDate: Date;
  totalRevenue: number;
  totalCommission: number;
  totalDeliveryFees: number;
  totalRefunds: number;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
  topRestaurants: any[];
  dailyBreakdown: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly apiUrl = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) {}

  // Dashboard APIs
  getDashboardSummary(): Observable<DashboardSummaryDTO> {
    return this.http.get<DashboardSummaryDTO>(`${this.apiUrl}/dashboard`);
  }

  getFinancialReport(startDate: string, endDate: string): Observable<FinancialReportDTO> {
    const params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<FinancialReportDTO>(`${this.apiUrl}/financial-report`, { params });
  }

  // User Management APIs
  getAllUsers(): Observable<UserManagementDTO[]> {
    return this.http.get<UserManagementDTO[]>(`${this.apiUrl}/users`);
  }

  getUserById(userId: number): Observable<UserManagementDTO> {
    return this.http.get<UserManagementDTO>(`${this.apiUrl}/users/${userId}`);
  }

  updateUserStatus(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/status`, data);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${userId}`);
  }

  // Restaurant Management APIs
  getRestaurants(): Observable<RestaurantApprovalDTO[]> {
    return this.http.get<RestaurantApprovalDTO[]>(`${this.apiUrl}/restaurants`);
  }

  getPendingRestaurants(): Observable<RestaurantApprovalDTO[]> {
    return this.http.get<RestaurantApprovalDTO[]>(`${this.apiUrl}/restaurants/pending`);
  }

  approveRestaurant(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/restaurants/approve`, data);
  }

  rejectRestaurant(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/restaurants/reject`, data);
  }

  // Delivery Partner Management APIs
  getDeliveryPartners(): Observable<DeliveryPartnerApprovalDTO[]> {
    return this.http.get<DeliveryPartnerApprovalDTO[]>(`${this.apiUrl}/delivery-partners`);
  }

  getPendingDeliveryPartners(): Observable<DeliveryPartnerApprovalDTO[]> {
    return this.http.get<DeliveryPartnerApprovalDTO[]>(`${this.apiUrl}/delivery-partners/pending`);
  }

  approveDeliveryPartner(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/delivery-partners/approve`, data);
  }

  rejectDeliveryPartner(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/delivery-partners/reject`, data);
  }

  // Order Management APIs
  getOrders(status?: string): Observable<AdminOrderDTO[]> {
    const params = status ? new HttpParams().set('status', status) : undefined;
    return this.http.get<AdminOrderDTO[]>(`${this.apiUrl}/orders`, { params });
  }

  getOrderById(orderId: number): Observable<AdminOrderDTO> {
    return this.http.get<AdminOrderDTO>(`${this.apiUrl}/orders/${orderId}`);
  }

  // Feedback Management APIs
  getAllFeedback(): Observable<FeedbackDTO[]> {
    return this.http.get<FeedbackDTO[]>(`${this.apiUrl}/feedback`);
  }

  getUnresolvedFeedback(): Observable<FeedbackDTO[]> {
    return this.http.get<FeedbackDTO[]>(`${this.apiUrl}/feedback/unresolved`);
  }

  respondToFeedback(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/feedback/respond`, data);
  }

  // Notification Management APIs
  getNotifications(userId?: number): Observable<NotificationDTO[]> {
    const params = userId ? new HttpParams().set('userId', userId.toString()) : undefined;
    return this.http.get<NotificationDTO[]>(`${this.apiUrl}/notifications`, { params });
  }

  markNotificationAsRead(notificationId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/notifications/${notificationId}/mark-read`, {});
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/notifications/${notificationId}`);
  }

  createNotification(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/notifications`, data);
  }
}