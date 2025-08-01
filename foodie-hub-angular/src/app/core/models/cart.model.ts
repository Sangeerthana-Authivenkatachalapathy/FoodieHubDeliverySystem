import { MenuItem } from './restaurant.model';

export interface CartItem {
  id: number;
  userId: number;
  menuItemId: number;
  quantity: number;
  menuItem?: MenuItem;
}

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

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}