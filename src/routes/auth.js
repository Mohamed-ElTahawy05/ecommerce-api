const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { register, login, getMe, updateProfile, updatePassword, forgotPassword, resetPassword } = require('../controllers/authControllers');
const validate = require('../middlewares/validate');
const { registerSchema, loginSchema } = require('../validations/authValidation');
const { protect } = require('../middlewares/authMiddleware');
const passport = require('../config/passport');

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.put('/update-password', protect, updatePassword);
router.post('/forgot-password', forgotPassword);
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