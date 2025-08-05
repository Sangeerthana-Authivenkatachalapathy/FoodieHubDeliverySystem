# Restaurant Admin Dashboard

A comprehensive admin dashboard for managing restaurant applications built with **Angular 20** and **Node.js 24**. This application allows administrators to review, approve, or reject restaurant applications with detailed information management.

## 🚀 Technology Stack

### Frontend
- **Angular 20** - Latest Angular framework with standalone components
- **Angular Material** - Modern UI component library
- **TypeScript 5.6** - Type-safe development
- **RxJS 7.8** - Reactive programming
- **CSS3** - Modern styling with flexbox and grid

### Backend
- **Node.js 24** - Latest Node.js runtime with ES modules
- **Express 5** - Fast web framework
- **MongoDB 8** - Modern NoSQL database
- **Mongoose** - Object modeling for MongoDB
- **JWT** - Secure authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

## ✨ Features

### 🔐 Authentication System
- Secure JWT-based authentication with refresh tokens
- Role-based access control (Admin, Super Admin)
- Password strength validation
- Session management

### 📊 Dashboard Analytics
- Real-time statistics overview
- Pending, approved, and rejected restaurant counts
- Recent applications tracking
- Interactive charts and metrics

### 🏪 Restaurant Management
- **Pending Applications**: Review new restaurant submissions
- **Approved Restaurants**: Manage approved establishments
- **Rejected Applications**: Track declined submissions with reasons
- **Detailed Views**: Comprehensive restaurant information display

### 🔍 Advanced Features
- **Search & Filter**: Find restaurants by name, email, city, or cuisine
- **Bulk Operations**: Approve or reject multiple applications at once
- **Document Management**: View and download business documents
- **Image Gallery**: Restaurant photo management with thumbnails
- **Notes System**: Add administrative notes to applications
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠 Prerequisites

- **Node.js 24+** (LTS recommended)
- **npm 10+** 
- **MongoDB 6+** (Local or Atlas)
- **Git**

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd restaurant-admin-dashboard
```

### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configurations
# MONGODB_URI=mongodb://localhost:27017/restaurant-admin
# JWT_SECRET=your-super-secret-jwt-key
# JWT_REFRESH_SECRET=your-refresh-secret-key
# PORT=3000
# FRONTEND_URL=http://localhost:4200

# Start MongoDB (if using local installation)
mongod

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

### 3. Frontend Setup
```bash
# In a new terminal, navigate to the frontend directory
cd restaurant-admin-dashboard

# Install dependencies
npm install

# Start the development server
ng serve

# The app will be available at http://localhost:4200
```

## 🔑 Default Login Credentials

After running the seed script, you can use these credentials:

### Super Admin Account
- **Email**: `admin@restaurant-admin.com`
- **Password**: `Admin123!`

### Admin Account
- **Email**: `john@restaurant-admin.com`
- **Password**: `Manager123!`

## 📱 API Documentation

### Authentication Endpoints
```
POST /api/auth/admin/login     - Admin login
POST /api/auth/admin/register  - Admin registration
POST /api/auth/refresh         - Refresh access token
POST /api/auth/logout          - Logout user
GET  /api/auth/me             - Get current user
```

### Admin Endpoints
```
GET    /api/admin/dashboard/stats           - Get dashboard statistics
GET    /api/admin/restaurants/pending       - Get pending restaurants
GET    /api/admin/restaurants/approved      - Get approved restaurants
GET    /api/admin/restaurants/rejected      - Get rejected restaurants
GET    /api/admin/restaurants/:id           - Get restaurant by ID
PATCH  /api/admin/restaurants/:id/approve   - Approve restaurant
PATCH  /api/admin/restaurants/:id/reject    - Reject restaurant
POST   /api/admin/restaurants/bulk/approve  - Bulk approve restaurants
POST   /api/admin/restaurants/bulk/reject   - Bulk reject restaurants
DELETE /api/admin/restaurants/:id           - Delete restaurant
```

### File Upload Endpoints
```
POST   /api/upload/single     - Upload single file
POST   /api/upload/multiple   - Upload multiple files
GET    /api/upload/:type/:filename - Serve uploaded file
DELETE /api/upload/:type/:filename - Delete uploaded file
```

## 🏗 Project Structure

```
restaurant-admin-dashboard/
├── src/app/                    # Angular 20 Frontend
│   ├── core/                   # Core services, guards, interceptors
│   │   ├── guards/             # Route guards
│   │   ├── interceptors/       # HTTP interceptors
│   │   ├── models/             # TypeScript interfaces
│   │   └── services/           # Business logic services
│   ├── shared/                 # Reusable components
│   │   └── components/         # Shared UI components
│   ├── features/               # Feature modules
│   │   ├── auth/               # Authentication components
│   │   ├── dashboard/          # Dashboard components
│   │   └── restaurants/        # Restaurant management
│   ├── app.component.ts        # Root component
│   ├── app.routes.ts           # Application routes
│   └── main.ts                 # Application bootstrap
├── backend/                    # Node.js 24 Backend
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # Express routes
│   ├── middleware/             # Custom middleware
│   ├── scripts/                # Database scripts
│   ├── uploads/                # File uploads directory
│   └── server.js               # Express server
├── angular.json                # Angular CLI configuration
├── package.json                # Frontend dependencies
└── README.md                   # Project documentation
```

## 🚀 Development Scripts

### Frontend (Angular)
```bash
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run unit tests
npm run lint       # Run ESLint
npm run e2e        # Run end-to-end tests
```

### Backend (Node.js)
```bash
npm run dev        # Start development server with nodemon
npm start          # Start production server
npm run seed       # Seed database with sample data
npm test           # Run tests
npm run lint       # Run ESLint
npm run format     # Format code with Prettier
```

## 🐳 Docker Support

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/restaurant-admin

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_REFRESH_SECRET=your-refresh-secret-key-min-32-chars

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:4200

# File Upload
MAX_FILE_SIZE=10485760  # 10MB
```

## 🧪 Testing

### Frontend Testing
```bash
# Unit tests
ng test

# E2E tests
ng e2e

# Coverage report
ng test --code-coverage
```

### Backend Testing
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- --grep "auth"
```

## 🚀 Production Deployment

### Build for Production
```bash
# Frontend
ng build --configuration production

# Backend
npm run build  # If you have a build script
```

### Environment Setup
- Set `NODE_ENV=production`
- Use MongoDB Atlas for database
- Configure proper CORS origins
- Set strong JWT secrets
- Enable HTTPS
- Set up proper logging
- Configure file upload limits

## 🔒 Security Features

- **JWT Authentication** with refresh tokens
- **Password Hashing** using bcryptjs
- **CORS Protection** with configurable origins
- **Rate Limiting** on API endpoints
- **Input Validation** on all routes
- **File Upload Security** with type checking
- **Helmet.js** for security headers
- **SQL Injection Protection** (NoSQL injection)

## 🎨 UI/UX Features

- **Responsive Design** - Works on all devices
- **Material Design** - Modern Google Material UI
- **Dark Mode Support** - User preference based
- **Loading States** - Smooth user experience
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Real-time feedback
- **Progressive Web App** - Offline capabilities

## 📈 Performance Optimizations

- **Lazy Loading** - Route-based code splitting
- **OnPush Change Detection** - Optimized Angular performance
- **Compressed Assets** - Gzip compression
- **Image Optimization** - WebP format support
- **Caching Strategy** - Service worker caching
- **Bundle Analysis** - Webpack bundle analyzer

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the GitHub repository
- Check the documentation
- Review the API endpoints
- Check the console for error messages

## 🔄 Version History

- **v2.0.0** - Angular 20 + Node.js 24 upgrade
- **v1.0.0** - Initial release with Angular 17 + Node.js 18

---

**Built with ❤️ using Angular 20 and Node.js 24**