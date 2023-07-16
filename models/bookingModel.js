const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  numNight: {
    type: Number,
  },
  numGuest: {
    type: Number,
  },
  cabinPrice: {
    type: Number,
  },
  extrasPrice: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  status: {
    type: String,
  },
  hasBreakFast: {
    type: Boolean,
  },
  isPaid: {
    type: Boolean,
  },
  observations: {
    type: String,
  },
  cabin: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cabin',
  },
  guest: {
    type: mongoose.Schema.ObjectId,
    ref: 'Guest',
  },
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
