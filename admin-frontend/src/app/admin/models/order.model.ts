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
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryAddress: DeliveryAddress;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  createdAt: Date;
  updatedAt: Date;
  notes?: string;
  cancellationReason?: string;
}

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  subtotal: number;
  customizations?: OrderItemCustomization[];
}

export interface OrderItemCustomization {
  id: string;
  name: string;
  value: string;
  additionalPrice: number;
}

export interface DeliveryAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
  deliveryInstructions?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY_FOR_PICKUP = 'ready_for_pickup',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  DEBIT_CARD = 'debit_card',
  CASH_ON_DELIVERY = 'cash_on_delivery',
  DIGITAL_WALLET = 'digital_wallet',
  UPI = 'upi'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
  PARTIALLY_REFUNDED = 'partially_refunded'
}

export interface OrderListResponse {
  orders: Order[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface OrderFilters {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  paymentMethod?: PaymentMethod;
  restaurantId?: string;
  customerId?: string;
  deliveryPartnerId?: string;
  searchTerm?: string;
  dateFrom?: Date;
  dateTo?: Date;
  minAmount?: number;
  maxAmount?: number;
  city?: string;
}

export interface OrderStatusUpdate {
  status: OrderStatus;
  reason?: string;
  estimatedDeliveryTime?: Date;
}

export interface FinancialReport {
  period: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  commissionEarned: number;
  refundedAmount: number;
  netRevenue: number;
  ordersByStatus: { [key in OrderStatus]: number };
  paymentMethodBreakdown: { [key in PaymentMethod]: number };
  topRestaurants: RestaurantRevenue[];
  dailyRevenue: DailyRevenue[];
}

export interface RestaurantRevenue {
  restaurantId: string;
  restaurantName: string;
  orderCount: number;
  revenue: number;
  commission: number;
}

export interface DailyRevenue {
  date: string;
  orderCount: number;
  revenue: number;
  averageOrderValue: number;
}