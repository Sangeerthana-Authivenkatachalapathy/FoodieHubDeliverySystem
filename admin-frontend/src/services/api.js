import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Admin API endpoints
export const adminAPI = {
  // Dashboard
  getDashboardSummary: () => api.get('/admin/dashboard'),
  getFinancialReport: (startDate, endDate) => 
    api.get(`/admin/financial-report?startDate=${startDate}&endDate=${endDate}`),

  // User Management
  getAllUsers: () => api.get('/admin/users'),
  getUserById: (userId) => api.get(`/admin/users/${userId}`),
  updateUserStatus: (data) => api.put('/admin/users/status', data),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),

  // Restaurant Management
  getRestaurants: () => api.get('/admin/restaurants'),
  getPendingRestaurants: () => api.get('/admin/restaurants/pending'),
  approveRestaurant: (data) => api.post('/admin/restaurants/approve', data),
  rejectRestaurant: (data) => api.post('/admin/restaurants/reject', data),

  // Delivery Partner Management
  getDeliveryPartners: () => api.get('/admin/delivery-partners'),
  getPendingDeliveryPartners: () => api.get('/admin/delivery-partners/pending'),
  approveDeliveryPartner: (data) => api.post('/admin/delivery-partners/approve', data),
  rejectDeliveryPartner: (data) => api.post('/admin/delivery-partners/reject', data),

  // Order Management
  getOrders: (status) => api.get(`/admin/orders${status ? `?status=${status}` : ''}`),
  getOrderById: (orderId) => api.get(`/admin/orders/${orderId}`),

  // Feedback Management
  getAllFeedback: () => api.get('/admin/feedback'),
  getUnresolvedFeedback: () => api.get('/admin/feedback/unresolved'),
  respondToFeedback: (data) => api.post('/admin/feedback/respond', data),

  // Notification Management
  getNotifications: (userId) => api.get(`/admin/notifications${userId ? `?userId=${userId}` : ''}`),
  markNotificationAsRead: (notificationId) => 
    api.put(`/admin/notifications/${notificationId}/mark-read`),
  deleteNotification: (notificationId) => 
    api.delete(`/admin/notifications/${notificationId}`),
  createNotification: (data) => api.post('/admin/notifications', data),
};

export default api;