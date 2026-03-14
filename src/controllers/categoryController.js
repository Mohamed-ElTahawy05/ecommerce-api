const Category = require('../models/Category');
const AsyncHandle = require('../utils/AsyncHandle');
const ErrorCustome = require('../utils/ErrorCustome');

exports.getCategories = AsyncHandle(async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

exports.createCategory = AsyncHandle(async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json(category);
});

exports.deleteCategory = AsyncHandle(async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return next(new ErrorCustome('Category not found', 404));
    res.json({ message: 'Category deleted' });
});