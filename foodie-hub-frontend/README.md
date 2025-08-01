# FoodieHub Frontend

A modern React TypeScript frontend application for the FoodieHub delivery system. This application provides a complete user interface for customers to browse restaurants, manage their cart, place orders, and track deliveries.

## 🚀 Features

### Authentication
- **OTP-based Login**: Secure phone number verification with OTP
- **User Registration**: Complete user onboarding with profile information
- **JWT Token Management**: Automatic token handling and refresh

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

- **React 19** - Modern React with hooks and context
- **TypeScript** - Type-safe development
- **Styled Components** - CSS-in-JS styling solution
- **React Router** - Client-side routing
- **TanStack Query** - Server state management
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icon library

## 📱 UI/UX Features

- **Responsive Design**: Mobile-first responsive layout
- **Modern UI**: Clean, modern interface with gradient themes
- **Interactive Elements**: Smooth animations and transitions
- **Loading States**: Elegant loading indicators
- **Error Handling**: User-friendly error messages
- **Accessibility**: ARIA labels and keyboard navigation

## 🏗️ Architecture

### Component Structure
```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── cart/           # Shopping cart components
│   ├── layout/         # Layout components (Header, etc.)
│   ├── orders/         # Order management components
│   ├── profile/        # User profile components
│   └── restaurants/    # Restaurant browsing components
├── context/            # React Context providers
├── services/           # API service layer
├── types/              # TypeScript type definitions
└── App.tsx            # Main application component
```

### State Management
- **Auth Context**: User authentication state
- **Cart Context**: Shopping cart state
- **TanStack Query**: Server state and caching

### API Integration
- RESTful API integration with your ASP.NET Core backend
- Automatic request/response interceptors
- Error handling and retry logic
- JWT token management

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Your ASP.NET Core backend running

### Installation
1. Navigate to the frontend directory:
   ```bash
   cd foodie-hub-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   # Create .env file
   REACT_APP_API_URL=https://localhost:7200/api
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Configuration

### Environment Variables
- `REACT_APP_API_URL`: Backend API base URL

### API Endpoints
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

## 📱 Pages & Features

### Login Page (`/login`)
- Phone number input with validation
- OTP generation and verification
- Seamless user experience with step-by-step flow

### Registration Page (`/register`)
- Complete user information form
- Form validation and error handling
- Automatic login after successful registration

### Home Page (`/`)
- Hero section with search functionality
- Featured restaurants grid
- Quick action cards for easy navigation

### Restaurants Page (`/restaurants`)
- Restaurant listing with search and filters
- Restaurant cards with ratings and delivery time
- Pincode-based restaurant discovery

### Restaurant Detail Page (`/restaurants/:id`)
- Restaurant information and menu
- Add to cart functionality
- Interactive menu items with descriptions

### Cart Page (`/cart`)
- Shopping cart with item management
- Quantity controls and item removal
- Order summary with totals
- Checkout functionality

### Orders Page (`/orders`)
- Order history and tracking
- Order status updates
- Reorder functionality

### Profile Page (`/profile`)
- User information display
- Profile editing capabilities
- Address management

## 🎨 Design System

### Color Palette
- Primary: `#667eea` (Purple Blue)
- Secondary: `#764ba2` (Purple)
- Success: `#2ecc71` (Green)
- Error: `#ff4757` (Red)
- Background: `#f8f9fa` (Light Gray)

### Typography
- Primary Font: System fonts (-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.)
- Font Weights: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

### Components
- Cards with rounded corners (15px border-radius)
- Gradient buttons with hover effects
- Consistent spacing using 20px grid system
- Box shadows for depth and elevation

## 🔐 Security Features

- JWT token automatic handling
- Secure API communication
- Input validation and sanitization
- Protected routes with authentication guards
- Automatic logout on token expiration

## 📱 Mobile Responsiveness

- Mobile-first responsive design
- Touch-friendly interface elements
- Optimized for various screen sizes
- Hamburger menu for mobile navigation

## 🚀 Performance Optimizations

- Code splitting with React.lazy
- Image optimization and lazy loading
- Efficient re-rendering with React.memo
- API response caching with TanStack Query
- Bundle size optimization

## 🧪 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Consistent naming conventions

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📦 Build & Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- Static hosting (Netlify, Vercel, AWS S3)
- Docker containerization
- CDN integration
- Environment-specific builds

## 🤝 Integration with Backend

This frontend is designed to work seamlessly with your ASP.NET Core backend:

- **Authentication**: Integrates with your JWT-based auth system
- **API Calls**: All endpoints mapped to your backend controllers
- **Data Models**: TypeScript interfaces match your C# models
- **Error Handling**: Handles backend error responses gracefully

## 📝 Future Enhancements

- Real-time order tracking with WebSockets
- Push notifications for order updates
- Advanced search and filtering
- Restaurant reviews and ratings
- Loyalty program integration
- Payment gateway integration
- Multi-language support

---

**Note**: Make sure your ASP.NET Core backend is running and accessible at the configured API URL for the frontend to work properly.
