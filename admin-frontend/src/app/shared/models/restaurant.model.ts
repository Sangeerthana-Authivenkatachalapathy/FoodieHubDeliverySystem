export interface Restaurant {
  id: string;
  name: string;
  description: string;
  email: string;
  phoneNumber: string;
  address: Address;
  cuisineTypes: CuisineType[];
  status: RestaurantStatus;
  rating: number;
  reviewCount: number;
  ownerId: string;
  ownerName: string;
  licenseNumber: string;
  taxId: string;
  bankAccountDetails: BankAccountDetails;
  operatingHours: OperatingHours[];
  images: RestaurantImage[];
  documents: RestaurantDocument[];
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  approvedBy?: string;
  rejectedAt?: Date;
  rejectedBy?: string;
  rejectionReason?: string;
  deliveryRadius: number;
  minimumOrderAmount: number;
  deliveryFee: number;
  isActive: boolean;
}

export interface BankAccountDetails {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
  accountHolderName: string;
}

export interface OperatingHours {
  dayOfWeek: DayOfWeek;
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export interface RestaurantImage {
  id: string;
  url: string;
  type: ImageType;
  isPrimary: boolean;
}

export interface RestaurantDocument {
  id: string;
  type: DocumentType;
  url: string;
  fileName: string;
  uploadedAt: Date;
  isVerified: boolean;
}

export enum RestaurantStatus {
  PENDING_APPROVAL = 'pending_approval',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive'
}

export enum CuisineType {
  ITALIAN = 'italian',
  CHINESE = 'chinese',
  INDIAN = 'indian',
  MEXICAN = 'mexican',
  AMERICAN = 'american',
  THAI = 'thai',
  JAPANESE = 'japanese',
  MEDITERRANEAN = 'mediterranean',
  FAST_FOOD = 'fast_food',
  VEGETARIAN = 'vegetarian',
  VEGAN = 'vegan'
}

export enum DayOfWeek {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday'
}

export enum ImageType {
  LOGO = 'logo',
  BANNER = 'banner',
  INTERIOR = 'interior',
  FOOD = 'food'
}

export enum DocumentType {
  BUSINESS_LICENSE = 'business_license',
  FOOD_PERMIT = 'food_permit',
  TAX_CERTIFICATE = 'tax_certificate',
  INSURANCE = 'insurance'
}

export interface RestaurantListResponse {
  restaurants: Restaurant[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface RestaurantFilters {
  status?: RestaurantStatus;
  cuisineType?: CuisineType;
  searchTerm?: string;
  city?: string;
  rating?: number;
  dateFrom?: Date;
  dateTo?: Date;
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