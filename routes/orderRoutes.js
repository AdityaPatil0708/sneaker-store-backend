const express = require('express');
const { createOrder, getOrders, getOrderById } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/createOrder', protect, createOrder);
router.get('/getOrders', protect, getOrders);
router.get('/getOrder/:id', protect, getOrderById);

module.exports = router;