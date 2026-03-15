const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const errorMiddleware = require('./src/middlewares/errorMiddleware');
const passport = require('./src/config/passport');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());

// Set security HTTP headers
app.use(helmet());

app.use(morgan('combined'));
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// General API rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again in 15 minutes'
});
app.use('/api', limiter);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(passport.initialize());

// Routes
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/products', require('./src/routes/products'));
app.use('/api/cart', require('./src/routes/cart'));
app.use('/api/orders', require('./src/routes/orders'));
app.use('/api/reviews', require('./src/routes/reviews'));

app.use(errorMiddleware);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB Connected ✅');
        app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));
    })
    .catch((err) => console.log('DB Error:', err));