const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  image: { type: String, required: true }, // URL to image
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('products', productSchema);