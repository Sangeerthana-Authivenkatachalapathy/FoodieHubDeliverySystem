# FoodieHub Admin Angular - Folder Structure

```
foodie-hub-admin-angular/
├── README.md
├── FOLDER_STRUCTURE.md
├── package.json                          # Project dependencies and scripts
├── angular.json                          # Angular CLI configuration
├── proxy.conf.json                       # Proxy configuration for development
├── tsconfig.json                         # TypeScript configuration
├── tsconfig.app.json                     # TypeScript configuration for app
├── tsconfig.spec.json                    # TypeScript configuration for tests
│
├── src/
│   ├── index.html                        # Main HTML file
│   ├── main.ts                          # Main entry point
│   ├── polyfills.ts                     # Browser compatibility polyfills
│   ├── styles.scss                      # Global styles
│   │
│   ├── environments/
│   │   ├── environment.ts               # Development environment config
│   │   └── environment.prod.ts          # Production environment config
│   │
│   ├── assets/
│   │   ├── images/                      # Image assets
│   │   ├── icons/                       # Icon assets
│   │   └── fonts/                       # Font assets
│   │
│   └── app/
│       ├── app.component.ts             # Root component
│       ├── app.component.html           # Root component template
│       ├── app.component.scss           # Root component styles
│       ├── app.module.ts                # Main module
│       ├── app-routing.module.ts        # Routing configuration
│       │
│       ├── components/                  # Feature components
│       │   ├── layout/
│       │   │   ├── layout.component.ts
│       │   │   ├── layout.component.html
│       │   │   └── layout.component.scss
│       │   │
│       │   ├── login/
│       │   │   ├── login.component.ts
│       │   │   ├── login.component.html
│       │   │   └── login.component.scss
│       │   │
│       │   ├── dashboard/
│       │   │   ├── dashboard.component.ts
│       │   │   ├── dashboard.component.html
│       │   │   ├── dashboard.component.scss
│       │   │   └── components/
│       │   │       ├── stats-card/
│       │   │       ├── revenue-chart/
│       │   │       └── activity-chart/
│       │   │
│       │   ├── user-management/
│       │   │   ├── user-management.component.ts
│       │   │   ├── user-management.component.html
│       │   │   ├── user-management.component.scss
│       │   │   └── components/
│       │   │       ├── user-table/
│       │   │       ├── user-form/
│       │   │       └── user-details-modal/
│       │   │
│       │   ├── restaurant-management/
│       │   │   ├── restaurant-management.component.ts
│       │   │   ├── restaurant-management.component.html
│       │   │   ├── restaurant-management.component.scss
│       │   │   └── components/
│       │   │       ├── restaurant-table/
│       │   │       ├── restaurant-approval-modal/
│       │   │       └── restaurant-details/
│       │   │
│       │   ├── delivery-partner-management/
│       │   │   ├── delivery-partner-management.component.ts
│       │   │   ├── delivery-partner-management.component.html
│       │   │   ├── delivery-partner-management.component.scss
│       │   │   └── components/
│       │   │       ├── partner-table/
│       │   │       ├── partner-approval-modal/
│       │   │       └── partner-details/
│       │   │
│       │   ├── order-management/
│       │   │   ├── order-management.component.ts
│       │   │   ├── order-management.component.html
│       │   │   ├── order-management.component.scss
│       │   │   └── components/
│       │   │       ├── order-table/
│       │   │       ├── order-details-modal/
│       │   │       └── order-status-filter/
│       │   │
│       │   ├── feedback-management/
│       │   │   ├── feedback-management.component.ts
│       │   │   ├── feedback-management.component.html
│       │   │   ├── feedback-management.component.scss
│       │   │   └── components/
│       │   │       ├── feedback-table/
│       │   │       ├── feedback-response-modal/
│       │   │       └── feedback-details/
│       │   │
│       │   ├── notification-management/
│       │   │   ├── notification-management.component.ts
│       │   │   ├── notification-management.component.html
│       │   │   ├── notification-management.component.scss
│       │   │   └── components/
│       │   │       ├── notification-table/
│       │   │       ├── create-notification-modal/
│       │   │       └── notification-item/
│       │   │
│       │   └── financial-reports/
│       │       ├── financial-reports.component.ts
│       │       ├── financial-reports.component.html
│       │       ├── financial-reports.component.scss
│       │       └── components/
│       │           ├── revenue-chart/
│       │           ├── order-statistics/
│       │           └── restaurant-performance/
│       │
│       ├── shared/                       # Shared components and utilities
│       │   ├── components/
│       │   │   ├── loading-spinner/
│       │   │   ├── confirmation-dialog/
│       │   │   ├── data-table/
│       │   │   ├── status-chip/
│       │   │   └── chart-wrapper/
│       │   │
│       │   ├── directives/
│       │   │   ├── auto-focus.directive.ts
│       │   │   └── click-outside.directive.ts
│       │   │
│       │   ├── pipes/
│       │   │   ├── date-format.pipe.ts
│       │   │   ├── currency-format.pipe.ts
│       │   │   └── truncate.pipe.ts
│       │   │
│       │   └── validators/
│       │       ├── custom-validators.ts
│       │       └── form-utils.ts
│       │
│       ├── services/                     # Business logic services
│       │   ├── auth.service.ts          # Authentication service
│       │   ├── admin.service.ts         # Admin API service
│       │   ├── notification.service.ts  # Notification handling
│       │   ├── utils.service.ts         # Utility functions
│       │   └── error-handler.service.ts # Error handling
│       │
│       ├── guards/                       # Route guards
│       │   ├── auth.guard.ts            # Authentication guard
│       │   └── admin.guard.ts           # Admin role guard
│       │
│       ├── interceptors/                 # HTTP interceptors
│       │   ├── auth.interceptor.ts      # Token interceptor
│       │   └── error.interceptor.ts     # Error handling interceptor
│       │
│       ├── models/                       # TypeScript interfaces/models
│       │   ├── user.model.ts            # User-related interfaces
│       │   ├── restaurant.model.ts      # Restaurant-related interfaces
│       │   ├── order.model.ts           # Order-related interfaces
│       │   ├── feedback.model.ts        # Feedback-related interfaces
│       │   ├── notification.model.ts    # Notification-related interfaces
│       │   └── dashboard.model.ts       # Dashboard-related interfaces
│       │
│       └── utils/                        # Utility functions and constants
│           ├── constants.ts             # Application constants
│           ├── helpers.ts               # Helper functions
│           ├── date-utils.ts            # Date utility functions
│           └── validators.ts            # Custom validators
│
├── dist/                                # Build output directory
└── node_modules/                        # npm dependencies

```

## Key Folder Descriptions:

### `/src/app/components/`
Contains all feature-specific components organized by functionality. Each component folder includes:
- `.component.ts` - Component logic
- `.component.html` - Template
- `.component.scss` - Styles
- `components/` subfolder for child components

### `/src/app/shared/`
Reusable components, directives, pipes, and utilities used across the application.

### `/src/app/services/`
Contains all business logic services for API calls, authentication, and utility functions.

### `/src/app/models/`
TypeScript interfaces and type definitions for data structures.

### `/src/app/guards/`
Route guards for authentication and authorization.

### `/src/app/interceptors/`
HTTP interceptors for token management and error handling.

## Component Hierarchy:

```
AppComponent
└── RouterOutlet
    ├── LoginComponent (public route)
    └── LayoutComponent (protected routes)
        ├── SidenavComponent
        ├── ToolbarComponent
        └── RouterOutlet
            ├── DashboardComponent
            ├── UserManagementComponent
            ├── RestaurantManagementComponent
            ├── DeliveryPartnerManagementComponent
            ├── OrderManagementComponent
            ├── FeedbackManagementComponent
            ├── NotificationManagementComponent
            └── FinancialReportsComponent
```

## Technologies Used:

- **Angular 17** - Frontend framework
- **Angular Material** - UI component library
- **TypeScript** - Programming language
- **RxJS** - Reactive programming
- **Chart.js** - Charts and graphs
- **SCSS** - Styling
- **Node.js** - Development environment