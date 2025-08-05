# Restaurant Admin Dashboard

A comprehensive admin dashboard for managing restaurant applications and approvals. Built with Angular frontend and Node.js/Express backend with MongoDB database.

## Features

### Frontend (Angular)
- **Authentication System**: Secure login/register with JWT tokens
- **Dashboard Overview**: Statistics and recent applications
- **Restaurant Management**: View, approve, and reject restaurant applications
- **Detailed Reviews**: Comprehensive restaurant information display
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live status updates and notifications

### Backend (Node.js/Express)
- **RESTful API**: Comprehensive API for restaurant management
- **Authentication**: JWT-based authentication with refresh tokens
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Document and image upload handling
- **Validation**: Input validation and sanitization
- **Security**: Helmet, CORS, rate limiting

## Tech Stack

- **Frontend**: Angular 17, Angular Material, TypeScript, RxJS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: Angular Material, CSS3
- **Database**: MongoDB

## Project Structure

```
restaurant-admin-dashboard/
├── src/                          # Angular frontend
│   ├── app/
│   │   ├── core/                 # Core services, guards, models
│   │   ├── shared/               # Shared components
│   │   └── features/             # Feature modules
│   │       ├── auth/             # Authentication
│   │       └── admin/            # Admin features
├── backend/                      # Node.js backend
│   ├── models/                   # Database models
│   ├── routes/                   # API routes
│   ├── middleware/               # Custom middleware
│   └── server.js                 # Main server file
└── README.md
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v4.4 or higher)
- Angular CLI (v17)

## Installation

### Backend Setup

1. Navigate to the backend directory:
```bash
cd restaurant-admin-dashboard/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your `.env` file with appropriate values:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/restaurant-admin
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
FRONTEND_URL=http://localhost:4200
```

5. Start MongoDB service (if not running)

6. Start the backend server:
```bash
# Development
npm run dev

# Production
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd restaurant-admin-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
ng serve
```

4. Open your browser and navigate to `http://localhost:4200`

## Usage

### First Time Setup

1. Start both backend and frontend servers
2. Navigate to `http://localhost:4200`
3. Click "Register here" to create your first admin account
4. Fill in the registration form and submit
5. You'll be automatically logged in and redirected to the dashboard

### Managing Restaurant Applications

1. **Dashboard**: View overview statistics and recent applications
2. **Pending Applications**: Review new restaurant submissions
3. **Approved Restaurants**: Manage approved restaurants
4. **Rejected Applications**: View rejected applications
5. **Restaurant Details**: Click on any restaurant to view comprehensive details

### Key Features

- **Bulk Operations**: Select multiple restaurants for bulk approval/rejection
- **Search & Filter**: Find restaurants by name, email, city, or cuisine
- **Document Downloads**: Download required business documents
- **Status Tracking**: Monitor application status and timeline
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## API Endpoints

### Authentication
- `POST /api/auth/admin/register` - Register new admin user
- `POST /api/auth/admin/login` - Admin login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### Admin Restaurant Management
- `GET /api/admin/dashboard/stats` - Get dashboard statistics
- `GET /api/admin/restaurants/pending` - Get pending restaurants
- `GET /api/admin/restaurants/approved` - Get approved restaurants
- `GET /api/admin/restaurants/rejected` - Get rejected restaurants
- `GET /api/admin/restaurants/:id` - Get restaurant details
- `PATCH /api/admin/restaurants/:id/approve` - Approve restaurant
- `PATCH /api/admin/restaurants/:id/reject` - Reject restaurant
- `POST /api/admin/restaurants/bulk/approve` - Bulk approve
- `POST /api/admin/restaurants/bulk/reject` - Bulk reject
- `DELETE /api/admin/restaurants/:id` - Delete restaurant

## Database Schema

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin/super_admin),
  isActive: Boolean,
  permissions: [String],
  lastLogin: Date
}
```

### Restaurant Model
```javascript
{
  name: String,
  email: String,
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  cuisine: [String],
  description: String,
  website: String,
  images: [String],
  documents: {
    businessLicense: String,
    foodSafetyLicense: String,
    insuranceCertificate: String
  },
  status: String (pending/approved/rejected),
  submittedAt: Date,
  reviewedAt: Date,
  reviewedBy: ObjectId,
  rejectionReason: String,
  operatingHours: Object,
  applicationData: Object
}
```

## Security Features

- JWT authentication with refresh tokens
- Password hashing with bcrypt
- Request rate limiting
- CORS protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection with Helmet

## Development

### Running Tests
```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd restaurant-admin-dashboard
ng test
```

### Building for Production
```bash
# Build frontend
ng build --prod

# Backend is production-ready as-is
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.