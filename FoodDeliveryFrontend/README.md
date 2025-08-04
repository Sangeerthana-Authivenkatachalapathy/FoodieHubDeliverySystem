# FoodiHub - Food Delivery Frontend

A modern, responsive Angular frontend for the FoodiHub food delivery platform.

## Features

### Customer Features
- **Role Selection**: Choose between Customer, Restaurant, or Delivery Partner
- **Location-Based Service**: Enter pincode to find restaurants in your area
- **Restaurant Browsing**: Browse restaurants with filters (Top Rated, Fast Delivery)
- **Menu Navigation**: Category-wise menu with vegetarian/non-vegetarian indicators
- **Food Customization**: Add customizations like size, toppings, etc.
- **Shopping Cart**: Add/remove items, quantity controls, pricing breakdown
- **User Registration**: Multi-step registration with pincode verification
- **DigiPin Security**: 4-digit DigiPin for secure transactions
- **Multiple Payment Options**: UPI, Cards, Net Banking, Wallets, Cash on Delivery
- **Address Management**: Multiple delivery addresses with default selection
- **Order Confirmation**: Real-time order tracking and confirmation

### Technical Features
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Modern Angular**: Standalone components with latest Angular features
- **TypeScript**: Full type safety and IntelliSense support
- **Beautiful Animations**: Smooth transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Progressive Enhancement**: Works across all modern browsers

## Project Structure

```
FoodDeliveryFrontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── welcome/                 # Landing page with role selection
│   │   │   ├── customer/
│   │   │   │   ├── customer-dashboard/  # Pincode entry with modal
│   │   │   │   ├── restaurant-list/     # Restaurant browsing
│   │   │   │   ├── restaurant-menu/     # Menu with categories
│   │   │   │   ├── cart/               # Shopping cart
│   │   │   │   └── payment/            # Payment & checkout
│   │   │   ├── auth/
│   │   │   │   ├── register/           # Multi-step registration
│   │   │   │   └── login/              # User login
│   │   │   ├── restaurant/
│   │   │   │   └── restaurant-dashboard/ # Restaurant management (placeholder)
│   │   │   └── delivery/
│   │   │       └── delivery-dashboard/   # Delivery partner (placeholder)
│   │   ├── app.component.ts            # Root component
│   │   └── app.routes.ts               # Routing configuration
│   ├── styles.css                      # Global styles
│   └── index.html                      # Main HTML file
├── angular.json                        # Angular configuration
├── package.json                        # Dependencies and scripts
└── tsconfig.json                       # TypeScript configuration
```

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

## Installation

1. **Install Node.js**: Download and install from [nodejs.org](https://nodejs.org/)

2. **Install Angular CLI globally**:
   ```bash
   npm install -g @angular/cli
   ```

3. **Navigate to the frontend directory**:
   ```bash
   cd FoodDeliveryFrontend
   ```

4. **Install dependencies**:
   ```bash
   npm install
   ```

## Development

### Start Development Server

```bash
ng serve
# or
npm start
```

The application will be available at `http://localhost:4200`

### Build for Production

```bash
ng build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

## Usage Flow

### Customer Journey

1. **Landing Page**: Select "Customer" role
2. **Location Entry**: Enter 6-digit pincode in popup modal
3. **Restaurant Browsing**: Browse restaurants with filters
4. **Menu Selection**: Choose restaurant and browse categorized menu
5. **Add to Cart**: Select items with customizations and quantities
6. **Registration**: Complete 3-step registration process
   - Personal Information (name, email, phone, password)
   - Address Information (pincode verification, full address)
   - DigiPin Setup (4-digit security pin)
7. **Login**: Authenticate with email and password
8. **Payment**: Choose payment method and delivery address
9. **Order Confirmation**: Receive order confirmation with tracking details

### Key Features Demonstrated

- **Pincode Verification**: Mock API simulation with loading states
- **Form Validation**: Real-time validation with error messages
- **Responsive Design**: Mobile-optimized layouts
- **Interactive UI**: Hover effects, animations, and smooth transitions
- **State Management**: Proper component state handling
- **Type Safety**: Full TypeScript implementation

## Backend Integration

This frontend is designed to work with the C# Web API backend located in the `FoodieHubDeliverySystem` directory. The frontend currently uses mock data and simulated API calls that can be easily replaced with actual HTTP calls to the backend.

### API Integration Points

- User authentication and registration
- Restaurant and menu data fetching
- Order placement and tracking
- Payment processing
- Address management

## Styling

The application uses:
- **Custom CSS**: Modern design with CSS Grid and Flexbox
- **Font Awesome**: Icons for enhanced UI
- **Google Fonts**: Poppins font family for typography
- **CSS Variables**: Consistent color scheme and spacing
- **Mobile-First**: Responsive design principles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Future Enhancements

- Real-time order tracking
- Push notifications
- Social authentication
- Advanced search and filters
- User reviews and ratings
- Loyalty program integration
- Multi-language support

## License

This project is part of the FoodiHub food delivery system.