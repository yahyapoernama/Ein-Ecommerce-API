const express = require('express');
const { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router({ mergeParams: true });

// Get all categories
router.get('/', getAllCategories);

// Get category by ID
router.get('/:id', getCategoryById);

// Create a new category
router.post('/', createCategory);

// Update category by ID
router.put('/:id', updateCategory);

// Delete category by ID
router.delete('/:id', deleteCategory);

module.exports = router;

