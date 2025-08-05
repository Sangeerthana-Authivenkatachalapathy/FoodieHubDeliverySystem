import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: [true, 'Street address is required'],
    trim: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'State is required'],
    trim: true
  },
  zipCode: {
    type: String,
    required: [true, 'ZIP code is required'],
    trim: true,
    match: [/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code']
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    default: 'United States'
  },
  coordinates: {
    lat: Number,
    lng: Number
  }
}, { _id: false });

const operatingHoursSchema = new mongoose.Schema({
  monday: {
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  },
  tuesday: {
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  },
  wednesday: {
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  },
  thursday: {
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  },
  friday: {
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  },
  saturday: {
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  },
  sunday: {
    open: String,
    close: String,
    isClosed: { type: Boolean, default: false }
  }
}, { _id: false });

const documentsSchema = new mongoose.Schema({
  businessLicense: {
    type: String,
    required: [true, 'Business license is required']
  },
  foodSafetyLicense: {
    type: String,
    required: [true, 'Food safety license is required']
  },
  insuranceCertificate: {
    type: String,
    required: [true, 'Insurance certificate is required']
  }
}, { _id: false });

const applicationDataSchema = new mongoose.Schema({
  ownerName: {
    type: String,
    required: [true, 'Owner name is required'],
    trim: true
  },
  ownerPhone: {
    type: String,
    required: [true, 'Owner phone is required'],
    trim: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
  },
  ownerEmail: {
    type: String,
    required: [true, 'Owner email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  estimatedCapacity: {
    type: Number,
    required: [true, 'Estimated capacity is required'],
    min: [1, 'Capacity must be at least 1'],
    max: [1000, 'Capacity cannot exceed 1000']
  },
  deliveryRadius: {
    type: Number,
    required: [true, 'Delivery radius is required'],
    min: [1, 'Delivery radius must be at least 1 mile'],
    max: [50, 'Delivery radius cannot exceed 50 miles']
  },
  specialFeatures: [{
    type: String,
    trim: true
  }]
}, { _id: false });

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Restaurant name is required'],
    trim: true,
    maxlength: [100, 'Restaurant name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number']
  },
  address: {
    type: addressSchema,
    required: true
  },
  cuisine: [{
    type: String,
    required: true,
    trim: true,
    enum: [
      'American', 'Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese',
      'Thai', 'Mediterranean', 'French', 'Korean', 'Vietnamese', 'Greek',
      'Spanish', 'Middle Eastern', 'Caribbean', 'African', 'Brazilian',
      'German', 'Russian', 'Fusion', 'Vegetarian', 'Vegan', 'Seafood',
      'Steakhouse', 'Fast Food', 'Casual Dining', 'Fine Dining', 'Other'
    ]
  }],
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  website: {
    type: String,
    trim: true,
    match: [/^https?:\/\/.+/, 'Please enter a valid website URL']
  },
  images: [{
    type: String,
    required: true
  }],
  documents: {
    type: documentsSchema,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  reviewedAt: {
    type: Date
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rejectionReason: {
    type: String,
    trim: true
  },
  operatingHours: {
    type: operatingHoursSchema,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  applicationData: {
    type: applicationDataSchema,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  notes: [{
    content: String,
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better query performance
restaurantSchema.index({ status: 1, submittedAt: -1 });
restaurantSchema.index({ email: 1 }, { unique: true });
restaurantSchema.index({ name: 'text', 'address.city': 'text', cuisine: 'text' });
restaurantSchema.index({ 'address.coordinates': '2dsphere' });

// Virtual for days since submission
restaurantSchema.virtual('daysSinceSubmission').get(function() {
  return Math.floor((Date.now() - this.submittedAt) / (1000 * 60 * 60 * 24));
});

// Virtual for formatted address
restaurantSchema.virtual('fullAddress').get(function() {
  const addr = this.address;
  return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}`;
});

// Static method to get statistics
restaurantSchema.statics.getStatistics = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
  
  const result = {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  };
  
  stats.forEach(stat => {
    result[stat._id] = stat.count;
    result.total += stat.count;
  });
  
  return result;
};

// Static method to get restaurants by status with pagination
restaurantSchema.statics.getByStatusPaginated = function(status, page = 1, limit = 10, search = '', sortBy = 'submittedAt', sortOrder = 'desc') {
  const skip = (page - 1) * limit;
  const sort = {};
  sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
  
  let query = { status };
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { 'address.city': { $regex: search, $options: 'i' } },
      { cuisine: { $in: [new RegExp(search, 'i')] } }
    ];
  }
  
  return this.find(query)
    .populate('reviewedBy', 'name email')
    .sort(sort)
    .skip(skip)
    .limit(limit);
};

// Instance method to approve restaurant
restaurantSchema.methods.approve = function(reviewerId, notes) {
  this.status = 'approved';
  this.reviewedAt = new Date();
  this.reviewedBy = reviewerId;
  if (notes) {
    this.notes.push({
      content: notes,
      addedBy: reviewerId
    });
  }
  return this.save();
};

// Instance method to reject restaurant
restaurantSchema.methods.reject = function(reviewerId, reason, notes) {
  this.status = 'rejected';
  this.reviewedAt = new Date();
  this.reviewedBy = reviewerId;
  this.rejectionReason = reason;
  if (notes) {
    this.notes.push({
      content: notes,
      addedBy: reviewerId
    });
  }
  return this.save();
};

export default mongoose.model('Restaurant', restaurantSchema);