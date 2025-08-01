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

export interface OtpResponse {
  message: string;
  otp: string;
}