const express = require('express');
const { getAllCollections, getCollectionById, createCollection, updateCollection, deleteCollection } = require('../controllers/collectionController');

const router = express.Router({ mergeParams: true });

// Get all collections
router.get('/', getAllCollections);

// Get collection by ID
router.get('/:id', getCollectionById);

// Create a new collection
router.post('/', createCollection);

// Update collection by ID
router.put('/:id', updateCollection);

// Delete collection by ID
router.delete('/:id', deleteCollection);

module.exports = router;

