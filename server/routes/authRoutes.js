// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe } = require('../controllers/authController');
const upload = require('../config/multer');
const authMiddleware = require('../middleware/AuthMiddleware');

// Register (with profile pic upload)
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Get current user
router.get('/me', authMiddleware, getMe);

module.exports = router;
