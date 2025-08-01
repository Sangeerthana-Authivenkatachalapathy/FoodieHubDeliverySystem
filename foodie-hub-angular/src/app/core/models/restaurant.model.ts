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