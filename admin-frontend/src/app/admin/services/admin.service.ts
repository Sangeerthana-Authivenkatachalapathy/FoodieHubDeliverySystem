import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

// Models
import { User, UserListResponse, UserFilters, UserStatus } from '@shared/models/user.model';
import { Restaurant, RestaurantListResponse, RestaurantFilters, RestaurantStatus } from '@shared/models/restaurant.model';
import { Order, OrderListResponse, OrderFilters, OrderStatus, FinancialReport } from '../models/order.model';

// API Endpoints
import { API_ENDPOINTS, QUERY_PARAMS } from '@shared/constants/api-endpoints';

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

export interface DeliveryPartner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  vehicleType: string;
  licenseNumber: string;
  status: 'active' | 'inactive' | 'pending_approval' | 'suspended';
  rating: number;
  totalDeliveries: number;
  createdAt: Date;
  approvedAt?: Date;
}

export interface Feedback {
  id: string;
  customerId: string;
  customerName: string;
  orderId: string;
  restaurantId: string;
  restaurantName: string;
  rating: number;
  comment: string;
  type: 'order' | 'restaurant' | 'delivery' | 'app';
  status: 'new' | 'responded' | 'resolved';
  adminResponse?: string;
  createdAt: Date;
  respondedAt?: Date;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetAudience: 'all' | 'customers' | 'restaurants' | 'delivery_partners';
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  // ===================== DASHBOARD =====================
  
  /**
   * Get dashboard summary statistics
   * Implements: GetDashboardSummary
   */
  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(API_ENDPOINTS.DASHBOARD.SUMMARY);
  }

  // ===================== USER MANAGEMENT =====================
  
  /**
   * Get all users with pagination and filtering
   * Implements: GetAllUsers
   */
  getAllUsers(page: number = 1, pageSize: number = 10, filters?: UserFilters): Observable<UserListResponse> {
    let params = new HttpParams()
      .set(QUERY_PARAMS.PAGINATION.PAGE, page.toString())
      .set(QUERY_PARAMS.PAGINATION.PAGE_SIZE, pageSize.toString());

    if (filters) {
      if (filters.role) params = params.set(QUERY_PARAMS.FILTERS.ROLE, filters.role);
      if (filters.status) params = params.set(QUERY_PARAMS.FILTERS.STATUS, filters.status);
      if (filters.searchTerm) params = params.set(QUERY_PARAMS.FILTERS.SEARCH, filters.searchTerm);
      if (filters.dateFrom) params = params.set(QUERY_PARAMS.FILTERS.DATE_FROM, filters.dateFrom.toISOString());
      if (filters.dateTo) params = params.set(QUERY_PARAMS.FILTERS.DATE_TO, filters.dateTo.toISOString());
    }

    return this.http.get<UserListResponse>(API_ENDPOINTS.USERS.GET_ALL, { params });
  }

  /**
   * Get user by ID
   * Implements: GetUserById
   */
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(API_ENDPOINTS.USERS.GET_BY_ID(id));
  }

  /**
   * Update user status
   * Implements: UpdateUserStatus
   */
  updateUserStatus(id: string, status: UserStatus, reason?: string): Observable<any> {
    const body = { status, reason };
    return this.http.put(API_ENDPOINTS.USERS.UPDATE_STATUS(id), body);
  }

  /**
   * Delete user
   * Implements: DeleteUser
   */
  deleteUser(id: string): Observable<any> {
    return this.http.delete(API_ENDPOINTS.USERS.DELETE(id));
  }

  // ===================== RESTAURANT MANAGEMENT =====================
  
  /**
   * Get all restaurants
   * Implements: GetRestaurants
   */
  getRestaurants(page: number = 1, pageSize: number = 10, filters?: RestaurantFilters): Observable<RestaurantListResponse> {
    let params = new HttpParams()
      .set(QUERY_PARAMS.PAGINATION.PAGE, page.toString())
      .set(QUERY_PARAMS.PAGINATION.PAGE_SIZE, pageSize.toString());

    if (filters) {
      if (filters.status) params = params.set(QUERY_PARAMS.FILTERS.STATUS, filters.status);
      if (filters.searchTerm) params = params.set(QUERY_PARAMS.FILTERS.SEARCH, filters.searchTerm);
      if (filters.city) params = params.set(QUERY_PARAMS.FILTERS.CITY, filters.city);
    }

    return this.http.get<RestaurantListResponse>(API_ENDPOINTS.RESTAURANTS.GET_ALL, { params });
  }

  /**
   * Approve restaurant
   * Implements: ApproveRestaurant
   */
  approveRestaurant(id: string, notes?: string): Observable<any> {
    const body = { notes };
    return this.http.post(API_ENDPOINTS.RESTAURANTS.APPROVE(id), body);
  }

  /**
   * Reject restaurant
   * Implements: RejectRestaurant
   */
  rejectRestaurant(id: string, reason: string): Observable<any> {
    const body = { reason };
    return this.http.post(API_ENDPOINTS.RESTAURANTS.REJECT(id), body);
  }

  // ===================== ORDER MANAGEMENT =====================
  
  /**
   * Get orders by status
   * Implements: GetOrdersByStatus
   */
  getOrdersByStatus(status: OrderStatus, page: number = 1, pageSize: number = 10): Observable<OrderListResponse> {
    let params = new HttpParams()
      .set(QUERY_PARAMS.PAGINATION.PAGE, page.toString())
      .set(QUERY_PARAMS.PAGINATION.PAGE_SIZE, pageSize.toString())
      .set(QUERY_PARAMS.FILTERS.STATUS, status);

    return this.http.get<OrderListResponse>(API_ENDPOINTS.ORDERS.GET_BY_STATUS, { params });
  }

  /**
   * Get all orders with filters
   */
  getAllOrders(page: number = 1, pageSize: number = 10, filters?: OrderFilters): Observable<OrderListResponse> {
    let params = new HttpParams()
      .set(QUERY_PARAMS.PAGINATION.PAGE, page.toString())
      .set(QUERY_PARAMS.PAGINATION.PAGE_SIZE, pageSize.toString());

    if (filters) {
      if (filters.status) params = params.set(QUERY_PARAMS.FILTERS.STATUS, filters.status);
      if (filters.searchTerm) params = params.set(QUERY_PARAMS.FILTERS.SEARCH, filters.searchTerm);
      if (filters.dateFrom) params = params.set(QUERY_PARAMS.FILTERS.DATE_FROM, filters.dateFrom.toISOString());
      if (filters.dateTo) params = params.set(QUERY_PARAMS.FILTERS.DATE_TO, filters.dateTo.toISOString());
    }

    return this.http.get<OrderListResponse>(API_ENDPOINTS.ORDERS.GET_ALL, { params });
  }

  /**
   * Get financial report
   * Implements: GetFinancialReport
   */
  getFinancialReport(startDate: Date, endDate: Date): Observable<FinancialReport> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());

    return this.http.get<FinancialReport>(API_ENDPOINTS.ORDERS.GET_FINANCIAL_REPORT, { params });
  }

  // ===================== DELIVERY PARTNER MANAGEMENT =====================
  
  /**
   * Get all delivery partners
   * Implements: GetAllDeliveryPartners
   */
  getAllDeliveryPartners(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set(QUERY_PARAMS.PAGINATION.PAGE, page.toString())
      .set(QUERY_PARAMS.PAGINATION.PAGE_SIZE, pageSize.toString());

    return this.http.get(API_ENDPOINTS.DELIVERY_PARTNERS.GET_ALL, { params });
  }

  /**
   * Approve delivery partner
   * Implements: ApproveDeliveryPartner
   */
  approveDeliveryPartner(id: string, notes?: string): Observable<any> {
    const body = { notes };
    return this.http.post(API_ENDPOINTS.DELIVERY_PARTNERS.APPROVE(id), body);
  }

  /**
   * Reject delivery partner
   * Implements: RejectDeliveryPartner
   */
  rejectDeliveryPartner(id: string, reason: string): Observable<any> {
    const body = { reason };
    return this.http.post(API_ENDPOINTS.DELIVERY_PARTNERS.REJECT(id), body);
  }

  // ===================== FEEDBACK MANAGEMENT =====================
  
  /**
   * Get all feedback
   * Implements: GetAllFeedback
   */
  getAllFeedback(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set(QUERY_PARAMS.PAGINATION.PAGE, page.toString())
      .set(QUERY_PARAMS.PAGINATION.PAGE_SIZE, pageSize.toString());

    return this.http.get(API_ENDPOINTS.FEEDBACK.GET_ALL, { params });
  }

  /**
   * Respond to feedback
   * Implements: RespondToFeedback
   */
  respondToFeedback(id: string, response: string): Observable<any> {
    const body = { response };
    return this.http.post(API_ENDPOINTS.FEEDBACK.RESPOND(id), body);
  }

  // ===================== NOTIFICATION MANAGEMENT =====================
  
  /**
   * Get all notifications
   * Implements: GetNotifications
   */
  getNotifications(page: number = 1, pageSize: number = 10): Observable<any> {
    const params = new HttpParams()
      .set(QUERY_PARAMS.PAGINATION.PAGE, page.toString())
      .set(QUERY_PARAMS.PAGINATION.PAGE_SIZE, pageSize.toString());

    return this.http.get(API_ENDPOINTS.NOTIFICATIONS.GET_ALL, { params });
  }

  /**
   * Mark notification as read
   * Implements: MarkNotificationAsRead
   */
  markNotificationAsRead(id: string): Observable<any> {
    return this.http.put(API_ENDPOINTS.NOTIFICATIONS.MARK_AS_READ(id), {});
  }

  /**
   * Delete notification
   * Implements: DeleteNotificationAsync
   */
  deleteNotification(id: string): Observable<any> {
    return this.http.delete(API_ENDPOINTS.NOTIFICATIONS.DELETE(id));
  }

  /**
   * Create new notification
   */
  createNotification(notification: Partial<Notification>): Observable<any> {
    return this.http.post(API_ENDPOINTS.NOTIFICATIONS.CREATE, notification);
  }
}