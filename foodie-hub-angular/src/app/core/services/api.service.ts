import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { 
  User, 
  Restaurant, 
  MenuItem, 
  CartItem, 
  FoodOrder, 
  Category,
  OtpResponse,
  LoginCredentials,
  RegisterData,
  UserUpdateDto
} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // User/Auth APIs
  generateOtp(phoneNumber: string): Observable<OtpResponse> {
    return this.http.post<OtpResponse>(`${this.baseUrl}/User/generate-otp`, JSON.stringify(phoneNumber), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  verifyOtp(credentials: LoginCredentials): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/User/verify-otp?phoneNumber=${credentials.phoneNumber}&otp=${credentials.otp}`, {});
  }

  registerUser(userData: RegisterData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/User/register`, userData);
  }

  setDigiPin(phoneNumber: string, digiPin: string): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/User/set-digipin?phoneNumber=${phoneNumber}&digiPin=${digiPin}`, {});
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/User/${id}`);
  }

  updateUser(id: string, userData: UserUpdateDto): Observable<string> {
    return this.http.put<string>(`${this.baseUrl}/User/${id}`, userData);
  }

  // Restaurant APIs
  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/Restaurant`);
  }

  getRestaurantsByPincode(pincode: string): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/Restaurant/bypincode/${pincode}`);
  }

  getRestaurantById(id: number): Observable<Restaurant> {
    return this.http.get<Restaurant>(`${this.baseUrl}/Restaurant/${id}`);
  }

  createRestaurant(restaurant: Omit<Restaurant, 'id' | 'createdAt'>): Observable<Restaurant> {
    return this.http.post<Restaurant>(`${this.baseUrl}/Restaurant`, restaurant);
  }

  updateRestaurant(id: number, restaurant: Restaurant): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Restaurant/${id}`, restaurant);
  }

  deleteRestaurant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Restaurant/${id}`);
  }

  // Menu Item APIs
  getMenuItemsByRestaurant(restaurantId: number): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.baseUrl}/MenuItem/restaurant/${restaurantId}`);
  }

  getMenuItemById(id: number): Observable<MenuItem> {
    return this.http.get<MenuItem>(`${this.baseUrl}/MenuItem/${id}`);
  }

  createMenuItem(menuItem: Omit<MenuItem, 'menuItemId'>): Observable<MenuItem> {
    return this.http.post<MenuItem>(`${this.baseUrl}/MenuItem`, menuItem);
  }

  updateMenuItem(id: number, menuItem: MenuItem): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/MenuItem/${id}`, menuItem);
  }

  deleteMenuItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/MenuItem/${id}`);
  }

  // Category APIs
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/Category`);
  }

  getCategoryById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.baseUrl}/Category/${id}`);
  }

  // Cart APIs
  getCartItems(userId: number): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(`${this.baseUrl}/CartItem/user/${userId}`);
  }

  addToCart(cartItem: Omit<CartItem, 'id'>): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/CartItem`, cartItem);
  }

  updateCartItem(id: number, cartItem: CartItem): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/CartItem/${id}`, cartItem);
  }

  removeFromCart(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/CartItem/${id}`);
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/CartItem/user/${userId}`);
  }

  // Order APIs
  createOrder(order: Omit<FoodOrder, 'id' | 'orderDate'>): Observable<FoodOrder> {
    return this.http.post<FoodOrder>(`${this.baseUrl}/Order`, order);
  }

  getOrdersByUser(userId: number): Observable<FoodOrder[]> {
    return this.http.get<FoodOrder[]>(`${this.baseUrl}/Order/user/${userId}`);
  }

  getOrderById(id: number): Observable<FoodOrder> {
    return this.http.get<FoodOrder>(`${this.baseUrl}/Order/${id}`);
  }

  updateOrderStatus(id: number, status: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Order/${id}/status`, { status });
  }
}