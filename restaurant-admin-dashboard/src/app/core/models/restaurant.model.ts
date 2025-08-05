export interface Restaurant {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  cuisine: string[];
  description: string;
  website?: string;
  images: string[];
  documents: {
    businessLicense: string;
    foodSafetyLicense: string;
    insuranceCertificate: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
  rejectionReason?: string;
  operatingHours: {
    [day: string]: {
      open: string;
      close: string;
      isClosed: boolean;
    };
  };
  rating?: number;
  totalReviews?: number;
}

export interface RestaurantApplication {
  id: string;
  restaurant: Restaurant;
  applicationData: {
    ownerName: string;
    ownerPhone: string;
    ownerEmail: string;
    estimatedCapacity: number;
    deliveryRadius: number;
    specialFeatures: string[];
  };
}