const express = require('express');
const router = express.Router();
const { addReview, getProductReviews, deleteReview } = require('../controllers/reviewController');
const { protect } = require('../middlewares/authMiddleware');

router.route('/')
    .post(protect, addReview);

router.route('/:productId')
    .get(getProductReviews);

router.route('/:id')
    .delete(protect, deleteReview);

module.exports = router;
