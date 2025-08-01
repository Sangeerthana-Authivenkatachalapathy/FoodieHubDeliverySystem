// User related types
export interface User {
  userId: number;
  name: string;
  email: string;
  phoneNumber: string;
  isPhoneVerified: boolean;
  address: string;
  digiPin: string;
  role: UserRole;
  isApproved: boolean;
}

export enum UserRole {
  Customer = 0,
  RestaurantOwner = 1,
  DeliveryPartner = 2,
  Admin = 3
}

export interface UserUpdateDto {
  name?: string;
  email?: string;
  address?: string;
  phoneNumber?: string;
}

// Restaurant related types
export interface Restaurant {
  id: number;
  userId: number;
  restaurantName: string;
  description: string;
  licenseNumber: string;
  address: string;
  city: string;
  pincode: string;
  licenseCretification?: string;
  createdAt: string;
}

// Menu Item types
export interface MenuItem {
  menuItemId: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  categoryId: number;
  restaurantId: number;
  restaurant?: Restaurant;
  category?: Category;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

// Cart related types
export interface CartItem {
  id: number;
  userId: number;
  menuItemId: number;
  quantity: number;
  menuItem?: MenuItem;
}

// Order related types
export interface FoodOrder {
  id: number;
  userId: number;
  restaurantId: number;
  orderDate: string;
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  orderItems: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  price: number;
  menuItem?: MenuItem;
}

export enum OrderStatus {
  Pending = 0,
  Confirmed = 1,
  Preparing = 2,
  OutForDelivery = 3,
  Delivered = 4,
  Cancelled = 5
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface OtpResponse {
  message: string;
  otp: string;
}

// Auth types
export interface LoginCredentials {
  phoneNumber: string;
  otp: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  passwordHash: string;
}