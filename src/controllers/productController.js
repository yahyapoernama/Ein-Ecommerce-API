const { Op } = require('sequelize');
const { Product, Store } = require('../models');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Store,
          attributes: [],
          where: { slug: req.params.slug },
        },
      ],
      where: req.query.search
        ? {
          [Op.or]: [
            { name: { [Op.iLike]: `%${req.query.search}%` } },
            { description: { [Op.iLike]: `%${req.query.search}%` } },
          ],
        }
        : {},
    });
    res.status(200).json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const createProduct = async (req, res) => {
  const t = await Product.sequelize.transaction();
  try {
    const product = await Product.create(req.body, { transaction: t });
    await product.setCollections(req.body.collections, { transaction: t });

    await t.commit();
    res.status(201).json({ product });
  } catch (err) {
    await t.rollback();
    res.status(500).json({
      message: 'Server error',
      error: err.message,
      name: err.name,
      stack: err.stack,
      errors: err
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.update(req.body);
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteProductSoft = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy(); // Soft delete (karena paranoid: true di model)

    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteProductPermanent = async (req, res) => {
  const { id } = req.params;
  const t = await Product.sequelize.transaction();

  try {
    // Ambil produk termasuk yang sudah soft delete
    const product = await Product.findOne({
      where: { id },
      paranoid: false, // <- Bypass soft delete
      transaction: t
    });

    // Jika tidak ditemukan, return error
    if (!product) {
      await t.rollback();
      return res.status(404).json({ message: 'Product not found' });
    }

    // Hapus relasi di pivot table
    await product.setCollections([], { transaction: t });
    await product.setCategories([], { transaction: t });

    // Hapus product permanent
    await Product.destroy({
      where: { id },
      force: true, // <- Hapus permanent
      transaction: t
    });

    await t.commit();
    res.status(200).json({ message: 'Product permanently deleted' });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteProductsSoftBatch = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Invalid product IDs' });
    }

    await Product.destroy({
      where: { id: ids },
    });

    res.json({ message: 'Products soft deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

const deleteProductsPermanentBatch = async (req, res) => {
  const { ids } = req.body; // Array of product IDs
  const t = await Product.sequelize.transaction();

  try {
    // Ambil semua produk termasuk yang sudah soft delete
    const products = await Product.findAll({
      where: { id: ids },
      paranoid: false, // <- Bypass soft delete
      transaction: t
    });

    // Jika tidak ada produk ditemukan
    if (!products.length) {
      await t.rollback();
      return res.status(404).json({ message: 'No products found' });
    }

    // Hapus semua relasi di pivot table
    for (const product of products) {
      await product.setCollections([], { transaction: t });
      await product.setCategories([], { transaction: t });
    }

    // Hapus semua produk permanent
    await Product.destroy({
      where: { id: ids },
      force: true, // <- Hapus permanent
      transaction: t
    });

    await t.commit();
    res.status(200).json({ message: 'Products permanently deleted' });
  } catch (err) {
    await t.rollback();
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductSoft,
  deleteProductPermanent,
  deleteProductsSoftBatch,
  deleteProductsPermanentBatch
};
