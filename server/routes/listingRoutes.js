// server/routes/listingRoutes.js
const express = require('express');
const router = express.Router();
const {
  createListing,
  getAllListings,
  getListingById
} = require('../controllers/listingController');

const upload = require('../config/multerMultiple');
const auth = require('../middleware/AuthMiddleware');

// Get all listings
router.get('/', getAllListings);

// Get one listing
router.get('/:id', getListingById);

// Create listing (must upload minimum 3 images)
router.post('/', auth, upload.array('images', 10), createListing);

module.exports = router;
