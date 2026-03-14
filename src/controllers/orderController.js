const Order = require('../models/Order');
const Cart = require('../models/Cart');
const AsyncHandle = require('../utils/AsyncHandle');
const ErrorCustome = require('../utils/ErrorCustome');

// POST create order
exports.createOrder = AsyncHandle(async (req, res, next) => {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price');
    if (!cart || cart.items.length === 0) return next(new ErrorCustome('Cart is empty', 400));

    const items = cart.items.map(i => ({
        product: i.product._id,
        quantity: i.quantity,
        price: i.product.price
    }));

    const totalPrice = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    const order = await Order.create({ user: req.user.id, items, totalPrice, shippingAddress });

    // امسح الـ cart بعد الـ order
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
});

// GET my orders
exports.getMyOrders = AsyncHandle(async (req, res) => {
    const orders = await Order.find({ user: req.user.id }).populate('items.product', 'name price');
    res.json(orders);
});

// GET all orders (admin)
exports.getAllOrders = AsyncHandle(async (req, res) => {
    const orders = await Order.find().populate('user', 'name email').populate('items.product', 'name price');
    res.json(orders);
});

// PUT update order status (admin)
exports.updateOrderStatus = AsyncHandle(async (req, res, next) => {
    const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    if (!order) return next(new ErrorCustome('Order not found', 404));
    res.json(order);
});