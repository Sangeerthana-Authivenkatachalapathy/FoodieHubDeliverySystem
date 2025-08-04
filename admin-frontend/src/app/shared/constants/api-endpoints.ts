const API_BASE_URL = 'https://localhost:7125/api'; // Update with your backend URL

export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH_TOKEN: `${API_BASE_URL}/auth/refresh-token`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`
  },

  // User Management
  USERS: {
    GET_ALL: `${API_BASE_URL}/admin/users`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/admin/users/${id}/status`,
    DELETE: (id: string) => `${API_BASE_URL}/admin/users/${id}`,
    EXPORT: `${API_BASE_URL}/admin/users/export`
  },

  // Dashboard
  DASHBOARD: {
    SUMMARY: `${API_BASE_URL}/admin/dashboard/summary`,
    STATISTICS: `${API_BASE_URL}/admin/dashboard/statistics`,
    RECENT_ACTIVITIES: `${API_BASE_URL}/admin/dashboard/recent-activities`,
    REVENUE_CHART: `${API_BASE_URL}/admin/dashboard/revenue-chart`,
    ORDER_ANALYTICS: `${API_BASE_URL}/admin/dashboard/order-analytics`
  },

  // Restaurant Management
  RESTAURANTS: {
    GET_ALL: `${API_BASE_URL}/admin/restaurants`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/admin/restaurants/${id}`,
    APPROVE: (id: string) => `${API_BASE_URL}/admin/restaurants/${id}/approve`,
    REJECT: (id: string) => `${API_BASE_URL}/admin/restaurants/${id}/reject`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/admin/restaurants/${id}/status`,
    GET_PENDING: `${API_BASE_URL}/admin/restaurants/pending`,
    GET_DOCUMENTS: (id: string) => `${API_BASE_URL}/admin/restaurants/${id}/documents`
  },

  // Order Management
  ORDERS: {
    GET_ALL: `${API_BASE_URL}/admin/orders`,
    GET_BY_STATUS: `${API_BASE_URL}/admin/orders/by-status`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/admin/orders/${id}`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/admin/orders/${id}/status`,
    GET_FINANCIAL_REPORT: `${API_BASE_URL}/admin/orders/financial-report`,
    EXPORT_REPORT: `${API_BASE_URL}/admin/orders/export-report`
  },

  // Delivery Partner Management
  DELIVERY_PARTNERS: {
    GET_ALL: `${API_BASE_URL}/admin/delivery-partners`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/admin/delivery-partners/${id}`,
    APPROVE: (id: string) => `${API_BASE_URL}/admin/delivery-partners/${id}/approve`,
    REJECT: (id: string) => `${API_BASE_URL}/admin/delivery-partners/${id}/reject`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/admin/delivery-partners/${id}/status`,
    GET_PENDING: `${API_BASE_URL}/admin/delivery-partners/pending`,
    GET_PERFORMANCE: (id: string) => `${API_BASE_URL}/admin/delivery-partners/${id}/performance`
  },

  // Feedback Management
  FEEDBACK: {
    GET_ALL: `${API_BASE_URL}/admin/feedback`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/admin/feedback/${id}`,
    RESPOND: (id: string) => `${API_BASE_URL}/admin/feedback/${id}/respond`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/admin/feedback/${id}/status`,
    GET_ANALYTICS: `${API_BASE_URL}/admin/feedback/analytics`
  },

  // Notification Management
  NOTIFICATIONS: {
    GET_ALL: `${API_BASE_URL}/admin/notifications`,
    GET_BY_ID: (id: string) => `${API_BASE_URL}/admin/notifications/${id}`,
    MARK_AS_READ: (id: string) => `${API_BASE_URL}/admin/notifications/${id}/mark-read`,
    DELETE: (id: string) => `${API_BASE_URL}/admin/notifications/${id}`,
    CREATE: `${API_BASE_URL}/admin/notifications`,
    SEND_BULK: `${API_BASE_URL}/admin/notifications/bulk-send`
  },

  // File Upload
  FILES: {
    UPLOAD: `${API_BASE_URL}/files/upload`,
    DELETE: (id: string) => `${API_BASE_URL}/files/${id}`
  }
};

// Query parameter helpers
export const QUERY_PARAMS = {
  PAGINATION: {
    PAGE: 'page',
    PAGE_SIZE: 'pageSize',
    SORT_BY: 'sortBy',
    SORT_ORDER: 'sortOrder'
  },
  FILTERS: {
    STATUS: 'status',
    ROLE: 'role',
    SEARCH: 'search',
    DATE_FROM: 'dateFrom',
    DATE_TO: 'dateTo',
    CITY: 'city',
    CUISINE_TYPE: 'cuisineType'
  }
};