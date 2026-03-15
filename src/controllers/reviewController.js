const Review = require('../models/Review');
const Product = require('../models/Product');
const AsyncHandle = require('../utils/AsyncHandle');
const ErrorCustome = require('../utils/ErrorCustome');

// @desc    Add a review
// @route   POST /api/reviews
// @access  Private
exports.addReview = AsyncHandle(async (req, res, next) => {
    const { product: productId, rating, comment } = req.body;

    const isValidProduct = await Product.findById(productId);
    if (!isValidProduct) {
        return next(new ErrorCustome('No product found with that id', 404));
    }

    const alreadySubmitted = await Review.findOne({
        product: productId,
        user: req.user.id
    });

    if (alreadySubmitted) {
        return next(new ErrorCustome('Already submitted a review for this product', 400));
    }

    req.body.user = req.user.id;
    const review = await Review.create(req.body);

    res.status(201).json({ review });
});

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
exports.getProductReviews = AsyncHandle(async (req, res, next) => {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('user', 'name');

    res.status(200).json({ count: reviews.length, reviews });
});

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = AsyncHandle(async (req, res, next) => {
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) {
        return next(new ErrorCustome('No review found with that id', 404));
    }

    // Check if user is review owner or admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorCustome('Not authorized to access this route', 401));
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: 'Review deleted successfully' });
});
