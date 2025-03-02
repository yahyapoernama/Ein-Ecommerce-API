const express = require('express');
const { body, validationResult } = require('express-validator');
const { login, register, profile } = require('../controllers/authController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        type: 'Validation Error',
        errors: errors.array(),
      });
    }
    next();
  },
  register
);

router.post(
  '/login',
  [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        type: 'Validation Error',
        errors: errors.array(),
      });
    }
    next();
  },
  login
);

router.post(
  '/logout', 
  (req, res) => {
    res.clearCookie("token", { path: "/" }); // Hapus token dari client
    res.status(200).json({
      statusCode: 200,
      type: 'Success',
      message: 'User logged out successfully',
    });
  }
);

// Endpoint to check authentication
router.get(
  '/check',
  authenticateToken, 
  (req, res) => {
    res.send({
      message: 'Authenticated successfully',
      isAuthenticated: true,
      user: req.user
    });
  }
);

router.get(
  '/profile',
  authenticateToken,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        statusCode: 400,
        type: 'Validation Error',
        errors: errors.array(),
      });
    }
    next();
  },
  profile
);

module.exports = router;