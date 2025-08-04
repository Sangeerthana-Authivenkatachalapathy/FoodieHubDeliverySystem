export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  restaurantId: string;
  restaurantName: string;
  deliveryPartnerId?: string;
  deliveryPartnerName?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  specialInstructions?: string;
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  orderTime: Date;
  preparationTime?: number;
  deliveryTime?: number;
  rating?: number;
  feedback?: string;
  cancellationReason?: string;
  refundAmount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  customizations?: ItemCustomization[];
  specialRequests?: string;
  totalPrice: number;
}

export interface ItemCustomization {
  type: string;
  option: string;
  additionalCost: number;
}

export interface Address {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  instructions?: string;
}

export interface OrderTimeline {
  orderId: string;
  events: OrderEvent[];
}

export interface OrderEvent {
  id: string;
  type: OrderEventType;
  status: OrderStatus;
  timestamp: Date;
  description: string;
  performedBy?: string;
  location?: string;
  metadata?: any;
}

export interface OrderStats {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  averageOrderValue: number;
  averageDeliveryTime: number;
  averagePreparationTime: number;
  customerSatisfactionRating: number;
  peakOrderHours: { hour: number; count: number }[];
  ordersByStatus: { status: OrderStatus; count: number }[];
  ordersByRestaurant: { restaurantId: string; restaurantName: string; count: number }[];
}

export interface OrderFilters {
  status?: OrderStatus[];
  paymentStatus?: PaymentStatus[];
  paymentMethod?: PaymentMethod[];
  restaurantId?: string[];
  customerId?: string[];
  deliveryPartnerId?: string[];
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  amountRange?: {
    min: number;
    max: number;
  };
  deliveryZone?: string[];
  searchTerm?: string;
}

export interface OrderSearchResult {
  orders: Order[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
  filters: OrderFilters;
}

// Enums
export enum OrderStatus {
  PENDING = 'Pending',
  CONFIRMED = 'Confirmed',
  PREPARING = 'Preparing',
  READY_FOR_PICKUP = 'Ready for Pickup',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  REFUNDED = 'Refunded'
}

export enum PaymentStatus {
  PENDING = 'Pending',
  PAID = 'Paid',
  FAILED = 'Failed',
  REFUNDED = 'Refunded',
  PARTIALLY_REFUNDED = 'Partially Refunded'
}

export enum PaymentMethod {
  CREDIT_CARD = 'Credit Card',
  DEBIT_CARD = 'Debit Card',
  DIGITAL_WALLET = 'Digital Wallet',
  CASH_ON_DELIVERY = 'Cash on Delivery',
  BANK_TRANSFER = 'Bank Transfer'
}

export enum OrderEventType {
  ORDER_PLACED = 'Order Placed',
  ORDER_CONFIRMED = 'Order Confirmed',
  PAYMENT_PROCESSED = 'Payment Processed',
  PREPARATION_STARTED = 'Preparation Started',
  READY_FOR_PICKUP = 'Ready for Pickup',
  PICKED_UP = 'Picked Up',
  OUT_FOR_DELIVERY = 'Out for Delivery',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
  REFUND_PROCESSED = 'Refund Processed',
  CUSTOMER_NOTIFICATION = 'Customer Notification',
  RESTAURANT_NOTIFICATION = 'Restaurant Notification',
  DELIVERY_PARTNER_ASSIGNED = 'Delivery Partner Assigned'
}

// Type guards
export function isValidOrderStatus(status: string): status is OrderStatus {
  return Object.values(OrderStatus).includes(status as OrderStatus);
}

export function isValidPaymentStatus(status: string): status is PaymentStatus {
  return Object.values(PaymentStatus).includes(status as PaymentStatus);
}

export function isValidPaymentMethod(method: string): method is PaymentMethod {
  return Object.values(PaymentMethod).includes(method as PaymentMethod);
}

// Utility functions
export function calculateOrderTotal(items: OrderItem[], deliveryFee: number, taxRate: number): number {
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const tax = subtotal * taxRate;
  return subtotal + deliveryFee + tax;
}

export function getOrderStatusColor(status: OrderStatus): string {
  switch (status) {
    case OrderStatus.PENDING:
      return '#f39c12';
    case OrderStatus.CONFIRMED:
      return '#3498db';
    case OrderStatus.PREPARING:
      return '#e67e22';
    case OrderStatus.READY_FOR_PICKUP:
      return '#9b59b6';
    case OrderStatus.OUT_FOR_DELIVERY:
      return '#2ecc71';
    case OrderStatus.DELIVERED:
      return '#27ae60';
    case OrderStatus.CANCELLED:
      return '#e74c3c';
    case OrderStatus.REFUNDED:
      return '#95a5a6';
    default:
      return '#34495e';
  }
}

export function getPaymentStatusColor(status: PaymentStatus): string {
  switch (status) {
    case PaymentStatus.PENDING:
      return '#f39c12';
    case PaymentStatus.PAID:
      return '#27ae60';
    case PaymentStatus.FAILED:
      return '#e74c3c';
    case PaymentStatus.REFUNDED:
      return '#95a5a6';
    case PaymentStatus.PARTIALLY_REFUNDED:
      return '#f39c12';
    default:
      return '#34495e';
  }
}

export function formatOrderId(id: string): string {
  return `#${id.toUpperCase()}`;
}

export function getOrderDuration(orderTime: Date, deliveryTime?: Date): number {
  if (!deliveryTime) return 0;
  return Math.floor((deliveryTime.getTime() - orderTime.getTime()) / (1000 * 60)); // Duration in minutes
}