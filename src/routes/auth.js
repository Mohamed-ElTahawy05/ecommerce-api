const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { register, login, getMe, updateProfile, updatePassword, forgotPassword, resetPassword } = require('../controllers/authControllers');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validations/authValidation');
const { protect } = require('../middlewares/authMiddleware');
const passport = require('../config/passport');
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests
    message: 'Too many login attempts from this IP, please try again after 15 minutes'
});

const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests
    message: 'Too many accounts created from this IP, please try again after an hour'
});

const forgotPasswordLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 requests
    message: 'Too many password reset requests from this IP, please try again after an hour'
});

router.post('/register', registerLimiter, validate(registerSchema), register);
router.post('/login', loginLimiter, validate(loginSchema), login);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.put('/update-password', protect, updatePassword);
router.post('/forgot-password', forgotPasswordLimiter, forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: `${process.env.FRONTEND_URL}/login.html?error=google_failed`, session: false }),
    (req, res) => {
        const token = jwt.sign({ id: req.user._id, role: req.user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
        const user = { id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role };
        res.redirect(`${process.env.FRONTEND_URL}/login.html?token=${token}&user=${encodeURIComponent(JSON.stringify(user))}`);
    }
);

module.exports = router;