# FoodieHub Admin Frontend

Angular-based admin panel for managing the FoodieHub delivery system. This application provides comprehensive management capabilities for users, restaurants, delivery partners, orders, and system analytics.

## Features

### 🎯 Core Admin Functions

#### User Management
- **GetAllUsers**: View all users with pagination and filtering
- **GetUserById**: View detailed user profiles
- **UpdateUserStatus**: Activate, deactivate, or suspend user accounts
- **DeleteUser**: Remove users from the system

#### Dashboard Analytics
- **GetDashboardSummary**: Real-time business metrics and KPIs
- Revenue analytics and financial reports
- User growth and engagement metrics
- Order statistics and trends

#### Restaurant Management
- **GetRestaurants**: View all restaurants with advanced filtering
- **ApproveRestaurant**: Review and approve restaurant applications
- **RejectRestaurant**: Reject applications with reasons
- Document verification and compliance tracking

#### Order Management
- **GetOrdersByStatus**: Filter orders by various statuses
- **GetFinancialReport**: Generate detailed financial reports
- Order tracking and status management
- Payment and refund processing

#### Delivery Partner Management
- **GetAllDeliveryPartners**: Manage delivery partner accounts
- **ApproveDeliveryPartner**: Approve partner applications
- **RejectDeliveryPartner**: Reject applications with feedback
- Performance tracking and analytics

#### Feedback Management
- **GetAllFeedback**: View customer feedback and reviews
- **RespondToFeedback**: Admin responses to customer concerns
- Sentiment analysis and feedback analytics

#### Notification Management
- **GetNotifications**: Centralized notification system
- **MarkNotificationAsRead**: Update notification statuses
- **DeleteNotificationAsync**: Remove notifications
- Bulk notification sending capabilities

## Technology Stack

- **Framework**: Angular 17+ with TypeScript
- **UI Library**: Angular Material Design
- **State Management**: RxJS and Angular Services
- **Charts**: Chart.js with ng2-charts
- **HTTP Client**: Angular HttpClient with interceptors
- **Authentication**: JWT with route guards
- **Styling**: SCSS with responsive design
- **Build Tool**: Angular CLI

## Project Structure

```
admin-frontend/
├── src/app/
│   ├── core/                     # Core services, guards, interceptors
│   ├── shared/                   # Shared components, models, utilities
│   ├── features/                 # Feature modules
│   │   ├── dashboard/           # Dashboard and analytics
│   │   ├── user-management/     # User CRUD operations
│   │   ├── restaurant-management/  # Restaurant approvals
│   │   ├── order-management/    # Order tracking and reports
│   │   ├── delivery-partner-management/  # Partner management
│   │   ├── feedback-management/ # Feedback and reviews
│   │   ├── notification-management/  # Notifications
│   │   └── auth/               # Authentication
│   └── layout/                  # Application layout components
├── assets/                      # Static assets
└── environments/               # Environment configurations
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd admin-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
# Update src/environments/environment.ts with your backend API URL
```

4. Start the development server:
```bash
ng serve
```

5. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build:prod
```

## Configuration

### Environment Variables

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://your-backend-api.com/api',
  appName: 'FoodieHub Admin',
  version: '1.0.0'
};
```

### API Endpoints

Configure your backend API endpoints in `src/app/shared/constants/api-endpoints.ts`

## Authentication

The application uses JWT-based authentication with:
- **AuthGuard**: Protects routes requiring authentication
- **AdminGuard**: Ensures only admin users can access the panel
- **AuthInterceptor**: Automatically adds JWT tokens to HTTP requests

## Key Components

### Dashboard
- Real-time analytics and KPIs
- Revenue and order charts
- Recent activities feed
- Quick action buttons

### User Management
- Paginated user listing with advanced filters
- User profile management
- Status updates and account controls
- Bulk operations and export functionality

### Restaurant Management
- Application approval workflow
- Document verification system
- Performance analytics
- Compliance tracking

### Order Management
- Order status tracking
- Financial reporting
- Payment management
- Customer service tools

## Development Guidelines

### Code Structure
- Follow Angular style guide
- Use TypeScript strict mode
- Implement reactive programming patterns
- Maintain separation of concerns

### Component Architecture
- Smart/Container components for data management
- Dumb/Presentation components for UI
- Shared components for reusability
- Lazy-loaded feature modules

### State Management
- Use services for shared state
- Implement RxJS patterns
- Cache frequently used data
- Handle errors gracefully

## Testing

```bash
# Run unit tests
ng test

# Run e2e tests
ng e2e

# Generate coverage report
ng test --code-coverage
```

## Contributing

1. Follow the established folder structure
2. Write unit tests for new components
3. Update documentation for new features
4. Follow the TypeScript and Angular coding standards

## API Integration

The frontend integrates with the backend through RESTful APIs:

- **Base URL**: Configured in environment files
- **Authentication**: JWT tokens via HTTP headers
- **Error Handling**: Global error interceptor
- **Loading States**: Automatic loading indicators

## Deployment

### Development
```bash
ng serve --host 0.0.0.0 --port 4200
```

### Production
```bash
ng build --configuration production
# Deploy dist/ folder to your web server
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License.

## Support

For technical support or questions, please contact the development team.