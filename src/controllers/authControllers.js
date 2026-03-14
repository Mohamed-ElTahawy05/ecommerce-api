const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const AsyncHandle = require('../utils/AsyncHandle');
const ErrorCustome = require('../utils/ErrorCustome');
const sendEmail = require('../utils/sendEmail');

exports.register = AsyncHandle(async (req, res, next) => {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return next(new ErrorCustome('Email already exists', 400));
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

exports.login = AsyncHandle(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return next(new ErrorCustome('Invalid credentials', 400));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ErrorCustome('Invalid credentials', 400));
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
});

// GET my profile
exports.getMe = AsyncHandle(async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

// PUT update profile
exports.updateProfile = AsyncHandle(async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(
        req.user.id,
        { name, email },
        { new: true }
    ).select('-password');
    res.json(user);
});

// PUT update password
exports.updatePassword = AsyncHandle(async (req, res, next) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return next(new ErrorCustome('Current password is wrong', 400));
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ message: 'Password updated successfully' });
});

// POST forgot password
exports.forgotPassword = AsyncHandle(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new ErrorCustome('Email not found', 404));

    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 دقايق
    await user.save();

    const resetUrl = `http://localhost:3000/reset-password/${token}`;

    await sendEmail({
        to: user.email,
        subject: 'Reset Your Password',
        html: `
            <h2>Reset Password</h2>
            <p>اضغط على الرابط ده عشان تعيد تعيين الباسورد:</p>
            <a href="${resetUrl}" style="background:#000;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;">Reset Password</a>
            <p>الرابط صالح لمدة 10 دقايق بس.</p>
        `
    });

    res.json({ message: 'Reset email sent successfully' });
});

// PUT reset password
exports.resetPassword = AsyncHandle(async (req, res, next) => {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return next(new ErrorCustome('Invalid or expired token', 400));

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: 'Password reset successfully' });
});