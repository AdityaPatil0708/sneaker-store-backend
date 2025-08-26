const Order = require('../models/ordermodel');
const Cart = require('../models/cartmodel');
const Product = require('../models/productmodel');

// Create order from cart
const createOrder = async (req, res) => {
  const { shippingAddress } = req.body;
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
  if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

  let totalPrice = 0;
  const orderItems = [];

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) return res.status(400).json({ message: `Insufficient stock for ${item.product.name}` });
    totalPrice += item.product.price * item.quantity;
    orderItems.push({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    });
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  const order = await Order.create({
    user: req.user._id,
    items: orderItems,
    totalPrice,
    shippingAddress,
  });

  // Clear cart after order
  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

// Get user's orders
const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
};

// Get order by ID
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  if (order && order.user.toString() === req.user._id) res.json(order);
  else res.status(404).json({ message: 'Order not found' });
};

module.exports = { createOrder, getOrders, getOrderById };