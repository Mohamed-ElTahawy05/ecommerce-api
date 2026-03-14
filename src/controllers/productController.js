const Product = require('../models/Product');
const AsyncHandle = require('../utils/AsyncHandle');
const ErrorCustome = require('../utils/ErrorCustome');
const ApiFeatures = require('../utils/ApiFeatures');

// GET all products
exports.getProducts = AsyncHandle(async (req, res) => {
    const total = await Product.countDocuments();

    const features = new ApiFeatures(Product.find().populate('category', 'name'), req.query)
        .filter()
        .search()
        .sort()
        .limitFields()
        .paginate();

    const products = await features.query;

    res.json({
        total,
        page: features.page,
        pages: Math.ceil(total / features.limit),
        count: products.length,
        products
    });
});

// GET single product
exports.getProduct = AsyncHandle(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('category', 'name');
    if (!product) return next(new ErrorCustome('Product not found', 404));
    res.json(product);
});

// POST create product (admin only)
exports.createProduct = AsyncHandle(async (req, res) => {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    const product = await Product.create(data);
    res.status(201).json(product);
});

// PUT update product (admin only)
exports.updateProduct = AsyncHandle(async (req, res, next) => {
    const data = { ...req.body };
    if (req.file) data.image = req.file.filename;
    const product = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!product) return next(new ErrorCustome('Product not found', 404));
    res.json(product);
});
 
// DELETE product (admin only)
exports.deleteProduct = AsyncHandle(async (req, res, next) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(new ErrorCustome('Product not found', 404));
    res.json({ message: 'Product deleted' });
});