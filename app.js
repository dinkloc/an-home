const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const cabinRouter = require('./routes/cabinRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const guestRouter = require('./routes/guestRoutes');
const settingRouter = require('./routes/settingRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

app.use(cors());
// Security HTTP header
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit request per hours
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP, please try again in an hour!',
});

// Data sanitization against NoSQL query injection

app.use(mongoSanitize());

// Data sanitization against XSS

app.use(xss());
app.use(hpp());

app.use('/api', limiter);

//1) Global Middleware
app.use((req, res, next) => {
  // console.log('cookie', req.cookies);
  next();
});

app.use('/api/v1/cabins', cabinRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/guests', guestRouter);
app.use('/api/v1/settings', settingRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
