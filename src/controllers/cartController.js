const Cart = require('../models/Cart');
const AsyncHandle = require('../utils/AsyncHandle');
const ErrorCustome = require('../utils/ErrorCustome');

// GET cart
exports.getCart = AsyncHandle(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product', 'name price image');
    if (!cart) return res.json({ items: [] });
    res.json(cart);
});

// POST add to cart
exports.addToCart = AsyncHandle(async (req, res) => {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
        cart = await Cart.create({ user: req.user.id, items: [{ product: productId, quantity }] });
    } else {
        const itemIndex = cart.items.findIndex(i => i.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
    }

    res.json(cart);
});

// DELETE remove item from cart
exports.removeFromCart = AsyncHandle(async (req, res, next) => {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return next(new ErrorCustome('Cart not found', 404));

    cart.items = cart.items.filter(i => i.product.toString() !== req.params.productId);
    await cart.save();

    res.json(cart);
});