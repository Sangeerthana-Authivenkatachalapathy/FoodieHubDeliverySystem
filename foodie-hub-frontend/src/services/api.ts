import axios, { AxiosInstance, AxiosResponse } from 'axios';
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
  UserUpdateDto,
  ApiResponse
} from '../types';

class ApiService {
  private api: AxiosInstance;
  private baseURL = process.env.REACT_APP_API_URL || 'https://localhost:7200/api';

  constructor() {
    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor to include auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // User/Auth APIs
  async generateOtp(phoneNumber: string): Promise<OtpResponse> {
    const response = await this.api.post('/User/generate-otp', JSON.stringify(phoneNumber));
    return response.data;
  }

  async verifyOtp(credentials: LoginCredentials): Promise<User> {
    const response = await this.api.post(`/User/verify-otp?phoneNumber=${credentials.phoneNumber}&otp=${credentials.otp}`);
    return response.data;
  }

  async registerUser(userData: RegisterData): Promise<User> {
    const response = await this.api.post('/User/register', userData);
    return response.data;
  }

  async setDigiPin(phoneNumber: string, digiPin: string): Promise<string> {
    const response = await this.api.post(`/User/set-digipin?phoneNumber=${phoneNumber}&digiPin=${digiPin}`);
    return response.data;
  }

  async getUserById(id: string): Promise<User> {
    const response = await this.api.get(`/User/${id}`);
    return response.data;
  }

  async updateUser(id: string, userData: UserUpdateDto): Promise<string> {
    const response = await this.api.put(`/User/${id}`, userData);
    return response.data;
  }

  // Restaurant APIs
  async getAllRestaurants(): Promise<Restaurant[]> {
    const response = await this.api.get('/Restaurant');
    return response.data;
  }

  async getRestaurantsByPincode(pincode: string): Promise<Restaurant[]> {
    const response = await this.api.get(`/Restaurant/bypincode/${pincode}`);
    return response.data;
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    const response = await this.api.get(`/Restaurant/${id}`);
    return response.data;
  }

  async createRestaurant(restaurant: Omit<Restaurant, 'id' | 'createdAt'>): Promise<Restaurant> {
    const response = await this.api.post('/Restaurant', restaurant);
    return response.data;
  }

  async updateRestaurant(id: number, restaurant: Restaurant): Promise<void> {
    await this.api.put(`/Restaurant/${id}`, restaurant);
  }

  async deleteRestaurant(id: number): Promise<void> {
    await this.api.delete(`/Restaurant/${id}`);
  }

  // Menu Item APIs
  async getMenuItemsByRestaurant(restaurantId: number): Promise<MenuItem[]> {
    const response = await this.api.get(`/MenuItem/restaurant/${restaurantId}`);
    return response.data;
  }

  async getMenuItemById(id: number): Promise<MenuItem> {
    const response = await this.api.get(`/MenuItem/${id}`);
    return response.data;
  }

  async createMenuItem(menuItem: Omit<MenuItem, 'menuItemId'>): Promise<MenuItem> {
    const response = await this.api.post('/MenuItem', menuItem);
    return response.data;
  }

  async updateMenuItem(id: number, menuItem: MenuItem): Promise<void> {
    await this.api.put(`/MenuItem/${id}`, menuItem);
  }

  async deleteMenuItem(id: number): Promise<void> {
    await this.api.delete(`/MenuItem/${id}`);
  }

  // Category APIs
  async getAllCategories(): Promise<Category[]> {
    const response = await this.api.get('/Category');
    return response.data;
  }

  async getCategoryById(id: number): Promise<Category> {
    const response = await this.api.get(`/Category/${id}`);
    return response.data;
  }

  // Cart APIs
  async getCartItems(userId: number): Promise<CartItem[]> {
    const response = await this.api.get(`/CartItem/user/${userId}`);
    return response.data;
  }

  async addToCart(cartItem: Omit<CartItem, 'id'>): Promise<CartItem> {
    const response = await this.api.post('/CartItem', cartItem);
    return response.data;
  }

  async updateCartItem(id: number, cartItem: CartItem): Promise<void> {
    await this.api.put(`/CartItem/${id}`, cartItem);
  }

  async removeFromCart(id: number): Promise<void> {
    await this.api.delete(`/CartItem/${id}`);
  }

  async clearCart(userId: number): Promise<void> {
    await this.api.delete(`/CartItem/user/${userId}`);
  }

  // Order APIs
  async createOrder(order: Omit<FoodOrder, 'id' | 'orderDate'>): Promise<FoodOrder> {
    const response = await this.api.post('/Order', order);
    return response.data;
  }

  async getOrdersByUser(userId: number): Promise<FoodOrder[]> {
    const response = await this.api.get(`/Order/user/${userId}`);
    return response.data;
  }

  async getOrderById(id: number): Promise<FoodOrder> {
    const response = await this.api.get(`/Order/${id}`);
    return response.data;
  }

  async updateOrderStatus(id: number, status: number): Promise<void> {
    await this.api.put(`/Order/${id}/status`, { status });
  }
}

export const apiService = new ApiService();
export default apiService;