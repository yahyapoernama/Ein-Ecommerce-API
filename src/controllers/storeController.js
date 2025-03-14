const { Store } = require('../models');

// Get all Stores
const getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json({ stores });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get Store by ID
const getStoreById = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await Store.findByPk(id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        res.status(200).json({ store });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Create a new Store
const createStore = async (req, res) => {
    const { user_id, name, slug, description } = req.body;
    try {
        const newStore = await Store.create({ user_id, name, slug, description });
        res.status(201).json({ store: newStore });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update Store by ID
const updateStore = async (req, res) => {
    const { id } = req.params;
    const { user_id, name, slug, description } = req.body;
    try {
        const store = await Store.findByPk(id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        store.user_id = user_id;
        store.name = name;
        store.slug = slug;
        store.description = description;
        await store.save();
        res.status(200).json({ store });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Change status of Store by ID
const changeStoreStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const validStatus = ['pending', 'active', 'inactive', 'suspended'];
    if (!validStatus.includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
    }
    try {
        const store = await Store.findByPk(id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        store.status = status;
        await store.save();
        res.status(200).json({ store });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete Store by ID
const deleteStore = async (req, res) => {
    const { id } = req.params;
    try {
        const store = await Store.findByPk(id);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }
        await store.destroy();
        res.status(200).json({ message: 'Store deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

module.exports = {
    getAllStores,
    getStoreById,
    createStore,
    updateStore,
    changeStoreStatus,
    deleteStore,
};

