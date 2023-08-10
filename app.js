const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cabinRouter = require('./routes/cabinRoutes');
const bookingRouter = require('./routes/bookingRoutes');
const guestRouter = require('./routes/guestRoutes');
const settingRouter = require('./routes/settingRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(cors());
app.use('/api/v1/cabins', cabinRouter);
app.use('/api/v1/bookings', bookingRouter);
app.use('/api/v1/guests', guestRouter);
app.use('/api/v1/settings', settingRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
