export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userRole: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  profileImage?: string;
  address?: Address;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer',
  RESTAURANT_OWNER = 'restaurant_owner',
  DELIVERY_PARTNER = 'delivery_partner'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING_APPROVAL = 'pending_approval',
  REJECTED = 'rejected'
}

export interface UserListResponse {
  users: User[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface UserFilters {
  role?: UserRole;
  status?: UserStatus;
  searchTerm?: string;
  dateFrom?: Date;
  dateTo?: Date;
}