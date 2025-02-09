const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { getProfile, getAllUsers, getUserByUsername } = require('../controllers/userController');

const router = express.Router();

// Endpoint Profile (memerlukan autentikasi)
router.get('/profile', authenticateToken, getProfile);
// Endpoint Get All Users
router.get('/', getAllUsers);
// Endpoint Get User by Username
router.get('/:username', getUserByUsername);

module.exports = router;