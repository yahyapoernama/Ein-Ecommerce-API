const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const storeRoutes = require('./storeRoutes');
const categoryRoutes = require('./categoryRoutes');
const collectionRoutes = require('./collectionRoutes');
const productRoutes = require('./productRoutes');
const uploadRoutes = require('./uploadRoutes');

router.use('/auth', authRoutes); // Endpoint auth (register, login)
router.use('/users', userRoutes); // Endpoint user
router.use('/stores', storeRoutes); // Endpoint store
router.use('/categories', categoryRoutes); // Endpoint category
router.use('/:slug/collections', collectionRoutes); // Endpoint collection
router.use('/:slug/products', productRoutes); // Endpoint product
router.use('/upload', uploadRoutes);

router.use('/status', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

module.exports = router;
