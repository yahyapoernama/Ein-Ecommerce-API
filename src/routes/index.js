const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const productRoutes = require('./productRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/auth', authRoutes); // Endpoint auth (register, login)
router.use('/users', userRoutes); // Endpoint user (get all users, get user by username)
router.use('/products', productRoutes); // Endpoint product (get all products, get product by id)
router.use('/upload', uploadRoutes);

router.use('/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

module.exports = router;
