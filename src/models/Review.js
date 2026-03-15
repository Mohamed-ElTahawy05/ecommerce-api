const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Please provide a rating'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: [true, 'Please provide a comment'],
        trim: true
    }
}, { timestamps: true });

// Prevent generic multiple reviews per product by one user
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Static method to calculate average rating
reviewSchema.statics.calculateAverageRating = async function (productId) {
    const stats = await this.aggregate([
        {
            $match: { product: productId }
        },
        {
            $group: {
                _id: '$product',
                numOfReviews: { $sum: 1 },
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    try {
        if (stats.length > 0) {
            await this.model('Product').findByIdAndUpdate(productId, {
                averageRating: Math.round(stats[0].averageRating * 10) / 10,
                numOfReviews: stats[0].numOfReviews
            });
        } else {
            await this.model('Product').findByIdAndUpdate(productId, {
                averageRating: 0,
                numOfReviews: 0
            });
        }
    } catch (err) {
        console.error(err);
    }
};

// Call calculateAverageRating after save
reviewSchema.post('save', async function () {
    await this.constructor.calculateAverageRating(this.product);
});

// Call calculateAverageRating after remove
reviewSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await doc.constructor.calculateAverageRating(doc.product);
    }
});

module.exports = mongoose.model('Review', reviewSchema);
