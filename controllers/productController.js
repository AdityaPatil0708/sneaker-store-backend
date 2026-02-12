const Product = require('../models/productmodel');
// Get product by ID
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) res.json(product);
  else res.status(404).json({ message: 'Product not found' });
};

// Create product (admin only)
const createProduct = async (req, res) => {
  const { name, brand, price, size, color, stock, image, description } = req.body;
  const product = await Product.create({ name, brand, price, size, color, stock, image, description });
  res.status(201).json(product);
};

// Update product (admin only)
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = req.body.name || product.name;
    product.brand = req.body.brand || product.brand;
    product.price = req.body.price || product.price;
    product.size = req.body.size || product.size;
    product.stock = req.body.stock || product.stock;
    product.image = req.body.image || product.image;
    product.description = req.body.description || product.description;
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

// Delete product (admin only)
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = { getProductById, createProduct, updateProduct, deleteProduct };