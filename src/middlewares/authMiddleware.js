const jwt = require('jsonwebtoken');
const ErrorCustome = require('../utils/ErrorCustome');
const AsyncHandle = require('../utils/AsyncHandle');

const protect = AsyncHandle(async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return next(new ErrorCustome('Not authorized', 401));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
});

const adminOnly = (req, res, next) => {
    if (req.user.role !== 'admin') return next(new ErrorCustome('Admins only', 403));
    next();
};

module.exports = { protect, adminOnly };