import express from 'express';
import { body, query, validationResult } from 'express-validator';
import Restaurant from '../models/Restaurant.js';
import { auth, checkPermission, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Apply auth middleware to all routes
router.use(auth);
router.use(isAdmin);

// @route   GET /api/admin/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private (Admin)
router.get('/dashboard/stats', checkPermission('view_analytics'), async (req, res) => {
  try {
    const stats = await Restaurant.getStatistics();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics'
    });
  }
});

// @route   GET /api/admin/restaurants/pending
// @desc    Get pending restaurants
// @access  Private (Admin)
router.get('/restaurants/pending', [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('search').optional().trim(),
  query('sortBy').optional().isIn(['name', 'submittedAt', 'email']).withMessage('Invalid sort field'),
  query('sortOrder').optional().isIn(['asc', 'desc']).withMessage('Sort order must be asc or desc')
], checkPermission('view_restaurants'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'submittedAt',
      sortOrder = 'desc'
    } = req.query;

    const restaurants = await Restaurant.getByStatusPaginated(
      'pending',
      parseInt(page),
      parseInt(limit),
      search,
      sortBy,
      sortOrder
    );

    const total = await Restaurant.countDocuments({
      status: 'pending',
      ...(search && {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { 'address.city': { $regex: search, $options: 'i' } },
          { cuisine: { $in: [new RegExp(search, 'i')] } }
        ]
      })
    });

    res.json({
      success: true,
      data: restaurants,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get pending restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching pending restaurants'
    });
  }
});

// @route   GET /api/admin/restaurants/approved
// @desc    Get approved restaurants
// @access  Private (Admin)
router.get('/restaurants/approved', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('search').optional().trim(),
  query('sortBy').optional().isIn(['name', 'reviewedAt', 'email']),
  query('sortOrder').optional().isIn(['asc', 'desc'])
], checkPermission('view_restaurants'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'reviewedAt',
      sortOrder = 'desc'
    } = req.query;

    const restaurants = await Restaurant.getByStatusPaginated(
      'approved',
      parseInt(page),
      parseInt(limit),
      search,
      sortBy,
      sortOrder
    );

    const total = await Restaurant.countDocuments({
      status: 'approved',
      ...(search && {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { 'address.city': { $regex: search, $options: 'i' } },
          { cuisine: { $in: [new RegExp(search, 'i')] } }
        ]
      })
    });

    res.json({
      success: true,
      data: restaurants,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get approved restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching approved restaurants'
    });
  }
});

// @route   GET /api/admin/restaurants/rejected
// @desc    Get rejected restaurants
// @access  Private (Admin)
router.get('/restaurants/rejected', [
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 100 }),
  query('search').optional().trim(),
  query('sortBy').optional().isIn(['name', 'reviewedAt', 'email']),
  query('sortOrder').optional().isIn(['asc', 'desc'])
], checkPermission('view_restaurants'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'reviewedAt',
      sortOrder = 'desc'
    } = req.query;

    const restaurants = await Restaurant.getByStatusPaginated(
      'rejected',
      parseInt(page),
      parseInt(limit),
      search,
      sortBy,
      sortOrder
    );

    const total = await Restaurant.countDocuments({
      status: 'rejected',
      ...(search && {
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { 'address.city': { $regex: search, $options: 'i' } },
          { cuisine: { $in: [new RegExp(search, 'i')] } }
        ]
      })
    });

    res.json({
      success: true,
      data: restaurants,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get rejected restaurants error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching rejected restaurants'
    });
  }
});

// @route   GET /api/admin/restaurants/:id
// @desc    Get restaurant by ID
// @access  Private (Admin)
router.get('/restaurants/:id', checkPermission('view_restaurants'), async (req, res) => {
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

// @route   PATCH /api/admin/restaurants/:id/approve
// @desc    Approve a restaurant
// @access  Private (Admin)
router.patch('/restaurants/:id/approve', [
  body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
], checkPermission('approve_restaurants'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    if (restaurant.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending restaurants can be approved'
      });
    }

    const { notes } = req.body;
    await restaurant.approve(req.user.userId, notes);

    res.json({
      success: true,
      message: 'Restaurant approved successfully',
      data: restaurant
    });
  } catch (error) {
    console.error('Approve restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving restaurant'
    });
  }
});

// @route   PATCH /api/admin/restaurants/:id/reject
// @desc    Reject a restaurant
// @access  Private (Admin)
router.patch('/restaurants/:id/reject', [
  body('reason').notEmpty().trim().isLength({ max: 500 }).withMessage('Reason is required and cannot exceed 500 characters'),
  body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
], checkPermission('reject_restaurants'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const restaurant = await Restaurant.findById(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    if (restaurant.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Only pending restaurants can be rejected'
      });
    }

    const { reason, notes } = req.body;
    await restaurant.reject(req.user.userId, reason, notes);

    res.json({
      success: true,
      message: 'Restaurant rejected successfully',
      data: restaurant
    });
  } catch (error) {
    console.error('Reject restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting restaurant'
    });
  }
});

// @route   POST /api/admin/restaurants/bulk/approve
// @desc    Bulk approve restaurants
// @access  Private (Admin)
router.post('/restaurants/bulk/approve', [
  body('ids').isArray({ min: 1 }).withMessage('IDs array is required'),
  body('ids.*').isMongoId().withMessage('Invalid restaurant ID'),
  body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
], checkPermission('approve_restaurants'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { ids, notes } = req.body;

    const result = await Restaurant.updateMany(
      { _id: { $in: ids }, status: 'pending' },
      {
        $set: {
          status: 'approved',
          reviewedAt: new Date(),
          reviewedBy: req.user.userId
        },
        ...(notes && {
          $push: {
            notes: {
              content: notes,
              addedBy: req.user.userId
            }
          }
        })
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} restaurants approved successfully`,
      data: { modifiedCount: result.modifiedCount }
    });
  } catch (error) {
    console.error('Bulk approve error:', error);
    res.status(500).json({
      success: false,
      message: 'Error approving restaurants'
    });
  }
});

// @route   POST /api/admin/restaurants/bulk/reject
// @desc    Bulk reject restaurants
// @access  Private (Admin)
router.post('/restaurants/bulk/reject', [
  body('ids').isArray({ min: 1 }).withMessage('IDs array is required'),
  body('ids.*').isMongoId().withMessage('Invalid restaurant ID'),
  body('reason').notEmpty().trim().isLength({ max: 500 }).withMessage('Reason is required and cannot exceed 500 characters'),
  body('notes').optional().trim().isLength({ max: 500 }).withMessage('Notes cannot exceed 500 characters')
], checkPermission('reject_restaurants'), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { ids, reason, notes } = req.body;

    const result = await Restaurant.updateMany(
      { _id: { $in: ids }, status: 'pending' },
      {
        $set: {
          status: 'rejected',
          reviewedAt: new Date(),
          reviewedBy: req.user.userId,
          rejectionReason: reason
        },
        ...(notes && {
          $push: {
            notes: {
              content: notes,
              addedBy: req.user.userId
            }
          }
        })
      }
    );

    res.json({
      success: true,
      message: `${result.modifiedCount} restaurants rejected successfully`,
      data: { modifiedCount: result.modifiedCount }
    });
  } catch (error) {
    console.error('Bulk reject error:', error);
    res.status(500).json({
      success: false,
      message: 'Error rejecting restaurants'
    });
  }
});

// @route   DELETE /api/admin/restaurants/:id
// @desc    Delete a restaurant
// @access  Private (Admin)
router.delete('/restaurants/:id', checkPermission('delete_restaurants'), async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    
    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: 'Restaurant not found'
      });
    }

    res.json({
      success: true,
      message: 'Restaurant deleted successfully'
    });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting restaurant'
    });
  }
});

export default router;