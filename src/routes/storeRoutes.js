const express = require('express');
const { getAllStores, getStoreById, createStore, updateStore, changeStoreStatus, deleteStore } = require('../controllers/storeController');

const router = express.Router({ mergeParams: true });

// Get all stores
router.get('/', getAllStores);

// Get store by ID
router.get('/:id', getStoreById);

// Create a new store
router.post('/', createStore);

// Update store by ID
router.put('/:id', updateStore);

// Get all store status
router.get('/options/statuses', async (req, res) => {
  const storeStatus = [
    { value: 'pending', label: 'Pending' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'suspended', label: 'Suspended' },
  ];
  res.json(storeStatus);
});

// Change store status by ID
router.patch('/:id/status', changeStoreStatus);

// Delete store by ID
router.delete('/:id', deleteStore);

module.exports = router;
