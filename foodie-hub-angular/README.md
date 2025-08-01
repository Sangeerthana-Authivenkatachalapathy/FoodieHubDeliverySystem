# FoodieHub Angular Frontend

A modern Angular 17+ frontend application for the FoodieHub delivery system. This application provides a complete user interface for customers to browse restaurants, manage their cart, place orders, and track deliveries.

## 🚀 Features

### Authentication System
- **OTP-based Login**: Secure phone number verification with OTP
- **User Registration**: Complete user onboarding with profile information
- **JWT Token Management**: Automatic token handling and refresh
- **Route Guards**: Protected routes with authentication guards

### Restaurant Management
- **Restaurant Discovery**: Browse all restaurants or search by pincode
- **Restaurant Details**: View detailed restaurant information and menus
- **Menu Browsing**: Interactive menu with categories and item details

### Shopping Cart
- **Add to Cart**: Seamlessly add menu items to shopping cart
- **Quantity Management**: Increase/decrease item quantities
- **Cart Persistence**: Cart state maintained across sessions
- **Real-time Updates**: Live cart total and item count

### Order Management
- **Order Placement**: Complete checkout flow
- **Order History**: View past orders and their status
- **Order Tracking**: Real-time order status updates

### User Profile
- **Profile Management**: View and edit user information
- **Address Management**: Manage delivery addresses
- **Account Settings**: Update personal preferences

## 🛠️ Technology Stack

- **Angular 17+** - Latest Angular with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming with Observables
- **Angular Router** - Client-side routing with lazy loading
- **Angular Forms** - Reactive forms with validation
- **SCSS** - Enhanced CSS with variables and mixins
- **Angular HTTP Client** - HTTP communication with interceptors

## 📱 UI/UX Features

- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Clean, modern interface with gradient themes
- **Interactive Elements**: Smooth animations and transitions
- **Loading States**: Elegant loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── core/                    # Core functionality
│   │   ├── guards/              # Route guards
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── models/              # TypeScript interfaces
│   │   └── services/            # Business logic services
│   ├── features/                # Feature modules
│   │   ├── auth/                # Authentication features
│   │   ├── cart/                # Shopping cart
│   │   ├── home/                # Home page
│   │   ├── orders/              # Order management
│   │   ├── profile/             # User profile
│   │   └── restaurants/         # Restaurant features
│   ├── shared/                  # Shared components
│   │   └── components/          # Reusable components
│   ├── app.component.ts         # Root component
│   └── app.routes.ts            # Route configuration
├── environments/                # Environment configurations
└── styles.scss                 # Global styles
```

### Architecture Patterns
- **Standalone Components**: Modern Angular standalone components
- **Service-based Architecture**: Business logic in injectable services
- **Reactive Programming**: RxJS Observables for state management
- **Lazy Loading**: Route-based code splitting
- **Dependency Injection**: Angular's built-in DI system

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Angular CLI 17+
- Your ASP.NET Core backend running

### Installation

1. Navigate to the Angular directory:
   ```bash
   cd foodie-hub-angular
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```typescript
   // src/environments/environment.ts
   export const environment = {
     production: false,
     apiUrl: 'https://localhost:7200/api'
   };
   ```

4. Start the development server:
   ```bash
   ng serve
   # or
   npm start
   ```

5. Open [http://localhost:4200](http://localhost:4200) in your browser

## 🔧 Configuration

### Environment Variables
Configure your API endpoint in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7200/api'
};
```

### API Integration
The frontend integrates with these backend endpoints:
- `POST /User/generate-otp` - Generate OTP for login
- `POST /User/verify-otp` - Verify OTP and login
- `POST /User/register` - User registration
- `GET /Restaurant` - Get all restaurants
- `GET /Restaurant/bypincode/{pincode}` - Search restaurants by pincode
- `GET /Restaurant/{id}` - Get restaurant details
- `GET /MenuItem/restaurant/{id}` - Get menu items for restaurant
- `POST /CartItem` - Add item to cart
- `GET /CartItem/user/{userId}` - Get user's cart items
- And more...

## 📱 Components & Features

### Authentication Components
- **LoginComponent** (`/login`) - OTP-based authentication flow
- **RegisterComponent** (`/register`) - User registration form
- **AuthGuard** - Route protection for authenticated users

### Core Components
- **HomeComponent** (`/home`) - Dashboard with featured restaurants
- **HeaderComponent** - Navigation header with cart and user menu
- **RestaurantListComponent** (`/restaurants`) - Restaurant browsing
- **RestaurantDetailComponent** (`/restaurants/:id`) - Menu and ordering
- **CartComponent** (`/cart`) - Shopping cart management
- **OrdersComponent** (`/orders`) - Order history and tracking
- **ProfileComponent** (`/profile`) - User account management

### Services
- **AuthService** - Authentication and user management
- **ApiService** - HTTP API communication
- **CartService** - Shopping cart state management

## 🎨 Styling & Design

### Design System
- **Primary Colors**: `#667eea` (Purple Blue), `#764ba2` (Purple)
- **Typography**: System fonts with consistent font weights
- **Components**: Card-based design with rounded corners
- **Spacing**: Consistent 20px grid system
- **Animations**: Smooth hover effects and transitions

### SCSS Architecture
```scss
// Global styles in styles.scss
- Reset and base styles
- Utility classes (.btn, .card, .form-control)
- Grid system (.grid, .grid-2, .grid-3)
- Responsive breakpoints
- Animation keyframes
```

### Component Styling
Each component uses scoped styles with:
- Component-specific styling
- Responsive design patterns
- Hover and interaction states
- Mobile-first approach

## 🔐 Security Features

- **HTTP Interceptors**: Automatic JWT token handling
- **Route Guards**: Authentication-based route protection
- **Input Validation**: Form validation with Angular Reactive Forms
- **XSS Protection**: Angular's built-in sanitization
- **CSRF Protection**: Token-based request validation

## 📱 Mobile Responsiveness

- **Mobile-first Design**: Optimized for mobile devices
- **Responsive Navigation**: Hamburger menu for mobile
- **Touch-friendly UI**: Large touch targets and gestures
- **Flexible Layouts**: CSS Grid and Flexbox for responsive design
- **Optimized Performance**: Lazy loading and code splitting

## 🚀 Performance Optimizations

- **Lazy Loading**: Route-based code splitting
- **OnPush Change Detection**: Optimized change detection strategy
- **Standalone Components**: Reduced bundle size
- **HTTP Caching**: Response caching with interceptors
- **Tree Shaking**: Dead code elimination
- **AOT Compilation**: Ahead-of-time compilation

## 🧪 Development

### Available Scripts
```bash
ng serve          # Start development server
ng build          # Build for production
ng test           # Run unit tests
ng lint           # Run linting
ng generate       # Generate components/services
```

### Code Style
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Angular Style Guide**: Following official Angular conventions

### Component Generation
```bash
# Generate a new component
ng generate component features/example

# Generate a new service
ng generate service core/services/example

# Generate a new guard
ng generate guard core/guards/example
```

## 🌐 Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Progressive Enhancement**: Graceful degradation for older browsers

## 📦 Build & Deployment

### Production Build
```bash
ng build --configuration production
```

### Build Optimization
- **Bundle Analysis**: `ng build --stats-json`
- **Lazy Loading**: Automatic code splitting
- **Tree Shaking**: Dead code elimination
- **Minification**: CSS and JS minification
- **Compression**: Gzip compression ready

### Deployment Options
- **Static Hosting**: Netlify, Vercel, AWS S3, Firebase Hosting
- **Docker**: Container-based deployment
- **CDN Integration**: CloudFront, CloudFlare
- **CI/CD**: GitHub Actions, GitLab CI, Azure DevOps

## 🤝 Integration with ASP.NET Core Backend

This Angular frontend is designed to work seamlessly with your ASP.NET Core backend:

### API Communication
- **HTTP Client**: Angular HttpClient with interceptors
- **Error Handling**: Centralized error handling with user feedback
- **Loading States**: Loading indicators for all API calls
- **Retry Logic**: Automatic retry for failed requests

### Data Models
- **TypeScript Interfaces**: Match your C# models exactly
- **Type Safety**: Compile-time type checking
- **Validation**: Client-side validation matching server rules

### Authentication Flow
- **JWT Integration**: Token-based authentication
- **Automatic Headers**: Authorization headers added automatically
- **Token Refresh**: Automatic token refresh handling
- **Logout Handling**: Clean logout with token cleanup

## 🔄 State Management

### Service-based State Management
- **AuthService**: User authentication state
- **CartService**: Shopping cart state
- **RxJS Subjects**: Reactive state updates
- **Local Storage**: Persistent state storage

### Data Flow
```
Component → Service → HTTP Client → Backend API
Component ← Service ← HTTP Response ← Backend API
```

## 📝 Code Examples

### Service Usage
```typescript
// Inject service in component
constructor(private authService: AuthService) {}

// Subscribe to observables
this.authService.currentUser$.subscribe(user => {
  this.currentUser = user;
});

// Make API calls
this.authService.login(credentials).subscribe({
  next: (user) => this.router.navigate(['/home']),
  error: (error) => console.error('Login failed:', error)
});
```

### Reactive Forms
```typescript
// Create form in component
this.loginForm = this.fb.group({
  phoneNumber: ['', [Validators.required]],
  otp: ['', [Validators.required, Validators.minLength(6)]]
});

// Handle form submission
onSubmit(): void {
  if (this.loginForm.valid) {
    const formValue = this.loginForm.value;
    // Process form data
  }
}
```

### Route Guards
```typescript
// Protect routes with guards
{
  path: 'dashboard',
  component: DashboardComponent,
  canActivate: [authGuard]
}
```

## 🔮 Future Enhancements

- **PWA Support**: Progressive Web App capabilities
- **Push Notifications**: Real-time order updates
- **Offline Support**: Service worker for offline functionality
- **State Management**: NgRx for complex state management
- **Testing**: Comprehensive unit and e2e tests
- **Internationalization**: Multi-language support
- **Accessibility**: Enhanced WCAG compliance
- **Performance**: Advanced optimization techniques

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Configure your backend to allow requests from `http://localhost:4200`
2. **API Connection**: Verify the API URL in environment configuration
3. **Build Errors**: Check TypeScript strict mode compliance
4. **Route Issues**: Ensure proper route configuration and guards

### Debug Mode
```bash
ng serve --configuration development --source-map
```

## 📞 Support

For issues and questions:
1. Check the console for error messages
2. Verify backend API is running and accessible
3. Check network requests in browser dev tools
4. Review Angular documentation for framework-specific issues

---

**Note**: This Angular frontend requires your ASP.NET Core backend to be running and accessible at the configured API URL. Make sure both applications are properly configured to work together.