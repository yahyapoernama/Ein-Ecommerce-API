const { Collection, Store } = require('../models');

// Get All Collections
const getAllCollections = async (req, res) => {
  const { slug } = req.params; // Ambil slug dari params
  try {
    const store = await Store.findOne({ where: { slug } }); // Cari store berdasarkan slug
    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    // Ambil koleksi yang berelasi dengan store_id
    const collections = await Collection.findAll({ where: { store_id: store.id } });

    res.status(200).json({ collections });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Collection by ID
const getCollectionById = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await Collection.findByPk(id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json({ collection });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new collection
const createCollection = async (req, res) => {
  try {
    const collection = await Collection.create(req.body);
    res.status(201).json({ collection });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update collection by ID
const updateCollection = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await Collection.findByPk(id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    await collection.update(req.body);
    res.status(200).json({ collection });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete collection by ID
const deleteCollection = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await Collection.findByPk(id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    await collection.destroy();
    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllCollections,
  getCollectionById,
  createCollection,
  updateCollection,
  deleteCollection,
};
