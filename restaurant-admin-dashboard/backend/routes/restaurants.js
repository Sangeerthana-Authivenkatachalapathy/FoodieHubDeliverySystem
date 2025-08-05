const express = require('express');
const { body, validationResult } = require('express-validator');
const Restaurant = require('../models/Restaurant');

const router = express.Router();

// @route   GET /api/restaurants
// @desc    Get all restaurants (public endpoint for testing)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      search = '',
      sortBy = 'submittedAt',
      sortOrder = 'desc'
    } = req.query;

    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { 'address.city': { $regex: search, $options: 'i' } },
        { cuisine: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const restaurants = await Restaurant.find(query)
      .populate('reviewedBy', 'name email')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Restaurant.countDocuments(query);

    res.json({
      success: true,
      data: restaurants,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurants'
    });
  }
});

// @route   POST /api/restaurants
// @desc    Create a new restaurant application
// @access  Public
router.post('/', [
  body('name').notEmpty().trim().withMessage('Restaurant name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().trim().withMessage('Phone number is required'),
  body('address.street').notEmpty().trim().withMessage('Street address is required'),
  body('address.city').notEmpty().trim().withMessage('City is required'),
  body('address.state').notEmpty().trim().withMessage('State is required'),
  body('address.zipCode').matches(/^\d{5}(-\d{4})?$/).withMessage('Valid ZIP code is required'),
  body('cuisine').isArray({ min: 1 }).withMessage('At least one cuisine type is required'),
  body('description').notEmpty().trim().withMessage('Description is required'),
  body('applicationData.ownerName').notEmpty().trim().withMessage('Owner name is required'),
  body('applicationData.ownerPhone').notEmpty().trim().withMessage('Owner phone is required'),
  body('applicationData.ownerEmail').isEmail().withMessage('Valid owner email is required'),
  body('applicationData.estimatedCapacity').isInt({ min: 1 }).withMessage('Valid capacity is required'),
  body('applicationData.deliveryRadius').isInt({ min: 1 }).withMessage('Valid delivery radius is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const restaurant = new Restaurant(req.body);
    await restaurant.save();

    res.status(201).json({
      success: true,
      message: 'Restaurant application submitted successfully',
      data: restaurant
    });
  } catch (error) {
    console.error('Create restaurant error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Restaurant with this email already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating restaurant application'
    });
  }
});

// @route   GET /api/restaurants/:id
// @desc    Get restaurant by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('reviewedBy', 'name email')
      .populate('notes.addedBy', 'name email');

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      data: restaurant
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching restaurant'
    });
  }
});

module.exports = router;