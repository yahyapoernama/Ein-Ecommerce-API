const { Category } = require('../models');

// Get All Categories
const getAllCategories = async (req, res) => {
  const search = req.query.search ? { name: { [Op.iLike]: `%${req.query.search}%` } } : {};
  try {
    const categories = await Category.findAll({ where: search });
    res.status(200).json({ categories });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get Category by ID
const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Create a new category
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ category });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Update category by ID
const updateCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.update(req.body);
    res.status(200).json({ category });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    await category.destroy();
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
