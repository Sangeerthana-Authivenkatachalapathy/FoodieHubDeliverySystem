# FoodieHub Delivery System - Admin Module

## Overview

This is a comprehensive Angular admin module for the FoodieHub Delivery System. The module provides a complete administrative interface for managing orders, restaurants, delivery partners, customer feedback, and system notifications.

## Project Structure

```
src/
└── app/
    ├── admin/                      # Admin module
    │   ├── components/             # Reusable UI components
    │   │   ├── navbar/            # Top navigation bar
    │   │   ├── sidebar/           # Side navigation menu
    │   │   └── stats-card/        # Statistics display cards
    │   ├── pages/                 # Feature pages
    │   │   ├── dashboard/         # Main dashboard with stats
    │   │   ├── orders/           # Order management
    │   │   ├── feedback/         # Customer feedback management
    │   │   ├── delivery-partners/ # Delivery partner management
    │   │   ├── restaurants/      # Restaurant management
    │   │   └── notifications/    # System notifications
    │   ├── services/             # API calls and business logic
    │   │   └── admin.service.ts  # Main admin service
    │   ├── models/               # Interfaces and types
    │   │   └── order.model.ts    # Order-related models
    │   ├── admin-routing.module.ts # Admin routing configuration
    │   ├── admin.module.ts       # Admin module definition
    │   └── admin-layout.component.* # Main layout component
    ├── shared/                   # Shared components, directives, pipes
    ├── core/                     # Core services (auth, guards, interceptors)
    └── app-routing.module.ts     # Main app routing
```

## Features

### 🏠 Dashboard
- Real-time statistics display
- Key performance indicators (KPIs)
- Recent orders overview
- Interactive stats cards with trend indicators

### 📦 Order Management
- Comprehensive order listing and filtering
- Order status updates
- Search functionality
- Detailed order information

### 🍽️ Restaurant Management
- Restaurant partner overview
- Status management (Active/Inactive/Suspended)
- Performance metrics
- Contact information management

### 🚚 Delivery Partner Management
- Delivery partner profiles
- Zone assignments
- Performance tracking
- Status monitoring

### 💬 Customer Feedback
- Feedback collection and review
- Rating system
- Status tracking (New/Reviewed/Resolved)
- Response management

### 🔔 Notifications
- System-wide notification management
- Priority-based filtering
- Status updates
- Bulk actions (Mark all read, Dismiss all)

## Components

### Navigation Components
- **AdminNavbarComponent**: Top navigation with user profile and logout
- **AdminSidebarComponent**: Side navigation with menu items
- **StatsCardComponent**: Reusable statistics display cards

### Page Components
- **AdminDashboardComponent**: Main dashboard with overview
- **AdminOrdersComponent**: Order management interface
- **AdminRestaurantsComponent**: Restaurant management interface
- **AdminDeliveryPartnersComponent**: Delivery partner management
- **AdminFeedbackComponent**: Customer feedback management
- **AdminNotificationsComponent**: System notifications management

## Services

### AdminService
Comprehensive service providing:
- Dashboard statistics retrieval
- Order management operations
- Restaurant management operations
- Delivery partner management
- Feedback management
- Notification management
- Analytics and reporting

## Models

### Order Model
Complete order management with:
- Order status tracking
- Payment information
- Delivery details
- Customer information
- Item details with customizations

## Styling

The module uses a modern, responsive design with:
- CSS Grid and Flexbox layouts
- Material Design icons
- Consistent color scheme
- Mobile-responsive design
- Hover effects and transitions
- Loading states and animations

## Technology Stack

- **Angular**: Latest version with TypeScript
- **RxJS**: For reactive programming
- **HTTP Client**: For API communication
- **Angular Router**: For navigation
- **FormsModule**: For template-driven forms
- **ReactiveFormsModule**: For reactive forms

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Angular CLI
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd foodie-hub-delivery-system
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
ng serve
```

4. Navigate to `http://localhost:4200/admin`

### Development

To add new features:

1. Create components in the appropriate directory
2. Update the module declarations
3. Add routing if needed
4. Implement services for API calls
5. Add proper TypeScript interfaces

### Build

```bash
ng build --prod
```

## API Integration

The admin service is configured to work with REST APIs. Update the `baseUrl` in `AdminService` to point to your backend API.

Example API endpoints:
- GET `/api/admin/dashboard/stats`
- GET `/api/admin/orders`
- PATCH `/api/admin/orders/{id}/status`
- GET `/api/admin/restaurants`
- GET `/api/admin/delivery-partners`

## Features to Implement

- [ ] Authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] Advanced filtering and search
- [ ] Data export functionality
- [ ] Charts and analytics
- [ ] File upload capabilities
- [ ] Bulk operations
- [ ] Advanced reporting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please contact the development team.