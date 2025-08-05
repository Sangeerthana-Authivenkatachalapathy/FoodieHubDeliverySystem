import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { config } from 'dotenv';

import User from '../models/User.js';
import Restaurant from '../models/Restaurant.js';

// Load environment variables
config();

// Sample data
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@restaurant-admin.com',
    password: 'Admin123!',
    role: 'super_admin',
    permissions: [
      'view_restaurants',
      'approve_restaurants',
      'reject_restaurants',
      'delete_restaurants',
      'manage_users',
      'view_analytics',
      'system_settings'
    ]
  },
  {
    name: 'John Manager',
    email: 'john@restaurant-admin.com',
    password: 'Manager123!',
    role: 'admin',
    permissions: [
      'view_restaurants',
      'approve_restaurants',
      'reject_restaurants',
      'view_analytics'
    ]
  }
];

const sampleRestaurants = [
  {
    name: 'Bella Vista Italian',
    email: 'bellavista@email.com',
    phone: '+1-555-0101',
    address: {
      street: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'United States'
    },
    cuisine: ['Italian', 'Mediterranean'],
    description: 'Authentic Italian cuisine with a modern twist. Family-owned restaurant serving traditional recipes passed down through generations.',
    website: 'https://bellavista.com',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800'
    ],
    documents: {
      businessLicense: 'business-license-001.pdf',
      foodSafetyLicense: 'food-safety-001.pdf',
      insuranceCertificate: 'insurance-001.pdf'
    },
    status: 'pending',
    operatingHours: {
      monday: { open: '11:00', close: '22:00', isClosed: false },
      tuesday: { open: '11:00', close: '22:00', isClosed: false },
      wednesday: { open: '11:00', close: '22:00', isClosed: false },
      thursday: { open: '11:00', close: '22:00', isClosed: false },
      friday: { open: '11:00', close: '23:00', isClosed: false },
      saturday: { open: '11:00', close: '23:00', isClosed: false },
      sunday: { open: '12:00', close: '21:00', isClosed: false }
    },
    applicationData: {
      ownerName: 'Marco Rossi',
      ownerPhone: '+1-555-0102',
      ownerEmail: 'marco@bellavista.com',
      estimatedCapacity: 80,
      deliveryRadius: 5,
      specialFeatures: ['Outdoor Seating', 'Wine Bar', 'Private Dining']
    }
  },
  {
    name: 'Sakura Sushi',
    email: 'sakurasushi@email.com',
    phone: '+1-555-0201',
    address: {
      street: '456 Oak Avenue',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'United States'
    },
    cuisine: ['Japanese', 'Asian'],
    description: 'Fresh, authentic Japanese sushi and cuisine in the heart of LA. Our chefs trained in Tokyo bring traditional techniques to every dish.',
    website: 'https://sakurasushi.com',
    images: [
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
      'https://images.unsplash.com/photo-1553621042-f6e147245754?w=800'
    ],
    documents: {
      businessLicense: 'business-license-002.pdf',
      foodSafetyLicense: 'food-safety-002.pdf',
      insuranceCertificate: 'insurance-002.pdf'
    },
    status: 'approved',
    reviewedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    operatingHours: {
      monday: { open: '17:00', close: '22:00', isClosed: false },
      tuesday: { open: '17:00', close: '22:00', isClosed: false },
      wednesday: { open: '17:00', close: '22:00', isClosed: false },
      thursday: { open: '17:00', close: '22:00', isClosed: false },
      friday: { open: '17:00', close: '23:00', isClosed: false },
      saturday: { open: '17:00', close: '23:00', isClosed: false },
      sunday: { open: '', close: '', isClosed: true }
    },
    applicationData: {
      ownerName: 'Hiroshi Tanaka',
      ownerPhone: '+1-555-0202',
      ownerEmail: 'hiroshi@sakurasushi.com',
      estimatedCapacity: 45,
      deliveryRadius: 8,
      specialFeatures: ['Sushi Bar', 'Sake Selection', 'Omakase Menu']
    }
  },
  {
    name: 'Spice Garden Indian',
    email: 'spicegarden@email.com',
    phone: '+1-555-0301',
    address: {
      street: '789 Curry Lane',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'United States'
    },
    cuisine: ['Indian', 'Vegetarian'],
    description: 'Aromatic Indian cuisine featuring both North and South Indian specialties. We use authentic spices imported directly from India.',
    images: [
      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800'
    ],
    documents: {
      businessLicense: 'business-license-003.pdf',
      foodSafetyLicense: 'food-safety-003.pdf',
      insuranceCertificate: 'insurance-003.pdf'
    },
    status: 'rejected',
    reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    rejectionReason: 'Incomplete documentation - missing health permit',
    operatingHours: {
      monday: { open: '11:30', close: '21:30', isClosed: false },
      tuesday: { open: '11:30', close: '21:30', isClosed: false },
      wednesday: { open: '11:30', close: '21:30', isClosed: false },
      thursday: { open: '11:30', close: '21:30', isClosed: false },
      friday: { open: '11:30', close: '22:00', isClosed: false },
      saturday: { open: '11:30', close: '22:00', isClosed: false },
      sunday: { open: '12:00', close: '21:00', isClosed: false }
    },
    applicationData: {
      ownerName: 'Raj Patel',
      ownerPhone: '+1-555-0302',
      ownerEmail: 'raj@spicegarden.com',
      estimatedCapacity: 60,
      deliveryRadius: 6,
      specialFeatures: ['Buffet', 'Catering', 'Vegan Options']
    }
  },
  {
    name: 'Taco Libre',
    email: 'tacolibre@email.com',
    phone: '+1-555-0401',
    address: {
      street: '321 Sunset Boulevard',
      city: 'Austin',
      state: 'TX',
      zipCode: '73301',
      country: 'United States'
    },
    cuisine: ['Mexican', 'Fast Food'],
    description: 'Authentic Mexican street food and traditional dishes. Fresh ingredients prepared daily with family recipes from Guadalajara.',
    website: 'https://tacolibre.com',
    images: [
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800'
    ],
    documents: {
      businessLicense: 'business-license-004.pdf',
      foodSafetyLicense: 'food-safety-004.pdf',
      insuranceCertificate: 'insurance-004.pdf'
    },
    status: 'pending',
    operatingHours: {
      monday: { open: '10:00', close: '22:00', isClosed: false },
      tuesday: { open: '10:00', close: '22:00', isClosed: false },
      wednesday: { open: '10:00', close: '22:00', isClosed: false },
      thursday: { open: '10:00', close: '22:00', isClosed: false },
      friday: { open: '10:00', close: '23:00', isClosed: false },
      saturday: { open: '10:00', close: '23:00', isClosed: false },
      sunday: { open: '11:00', close: '21:00', isClosed: false }
    },
    applicationData: {
      ownerName: 'Carlos Rodriguez',
      ownerPhone: '+1-555-0402',
      ownerEmail: 'carlos@tacolibre.com',
      estimatedCapacity: 35,
      deliveryRadius: 10,
      specialFeatures: ['Drive-through', 'Late Night', 'Catering']
    }
  },
  {
    name: 'The Green Plate',
    email: 'greenplate@email.com',
    phone: '+1-555-0501',
    address: {
      street: '654 Eco Street',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      country: 'United States'
    },
    cuisine: ['Vegetarian', 'Vegan', 'American'],
    description: 'Plant-based cuisine focusing on organic, locally-sourced ingredients. Sustainable dining for the environmentally conscious.',
    website: 'https://thegreenplate.com',
    images: [
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800'
    ],
    documents: {
      businessLicense: 'business-license-005.pdf',
      foodSafetyLicense: 'food-safety-005.pdf',
      insuranceCertificate: 'insurance-005.pdf'
    },
    status: 'approved',
    reviewedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    operatingHours: {
      monday: { open: '08:00', close: '20:00', isClosed: false },
      tuesday: { open: '08:00', close: '20:00', isClosed: false },
      wednesday: { open: '08:00', close: '20:00', isClosed: false },
      thursday: { open: '08:00', close: '20:00', isClosed: false },
      friday: { open: '08:00', close: '21:00', isClosed: false },
      saturday: { open: '09:00', close: '21:00', isClosed: false },
      sunday: { open: '09:00', close: '19:00', isClosed: false }
    },
    applicationData: {
      ownerName: 'Sarah Johnson',
      ownerPhone: '+1-555-0502',
      ownerEmail: 'sarah@thegreenplate.com',
      estimatedCapacity: 50,
      deliveryRadius: 7,
      specialFeatures: ['Organic', 'Zero Waste', 'Compost Program']
    }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant-admin', {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Restaurant.deleteMany({});
    console.log('Cleared existing data');

    // Create users
    const createdUsers = [];
    for (const userData of sampleUsers) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${user.name}`);
    }

    // Create restaurants and assign reviewers
    const adminUser = createdUsers.find(user => user.role === 'super_admin');
    
    for (const restaurantData of sampleRestaurants) {
      if (restaurantData.status !== 'pending') {
        restaurantData.reviewedBy = adminUser._id;
      }
      
      const restaurant = new Restaurant(restaurantData);
      await restaurant.save();
      console.log(`Created restaurant: ${restaurant.name} (${restaurant.status})`);
    }

    console.log('\n=== Seed Data Created Successfully ===');
    console.log('\nDefault Admin User:');
    console.log('Email: admin@restaurant-admin.com');
    console.log('Password: Admin123!');
    console.log('\nDefault Manager User:');
    console.log('Email: john@restaurant-admin.com');
    console.log('Password: Manager123!');
    console.log('\nSample restaurants created with various statuses.');

    // Display statistics
    const stats = await Restaurant.getStatistics();
    console.log('\nRestaurant Statistics:');
    console.log(`- Pending: ${stats.pending}`);
    console.log(`- Approved: ${stats.approved}`);
    console.log(`- Rejected: ${stats.rejected}`);
    console.log(`- Total: ${stats.total}`);

  } catch (error) {
    console.error('Seed error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  }
}

// Run the seed function
seedDatabase();