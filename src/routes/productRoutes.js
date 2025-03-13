const express = require('express');
const {
    getAllProducts,
    getProductById,
    createProduct, 
    updateProduct, 
    deleteProductSoft,
    deleteProductPermanent,
    deleteProductsSoftBatch,
    deleteProductsPermanentBatch
} = require('../controllers/productController');

const router = express.Router({ mergeParams: true });

// Get all products
router.get('/', getAllProducts);

// Get product by ID
router.get('/:id', getProductById);

// Create a new product
router.post('/', createProduct);

// Update product by ID
router.put('/:id', updateProduct);

// Delete product by ID
router.delete('/:id', deleteProductSoft);

// Permanently delete product by ID
router.delete('/:id/permanent', deleteProductPermanent);

// Batch delete products
router.post('/batch-delete', deleteProductsSoftBatch);

// Batch permanently delete products
router.post('/batch-delete/permanent', deleteProductsPermanentBatch);

module.exports = router;

