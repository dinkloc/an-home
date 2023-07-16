const mongoose = require('mongoose');
const settingSchema = new mongoose.Schema({
  createAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  minBookingLength: {
    type: Number,
  },
  maxBookingLength: {
    type: Number,
  },
  maxGuestPerBooking: {
    type: Number,
  },
  breakFastPrice: {
    type: Number,
  },
});

const Setting = mongoose.model('Setting', settingSchema);
module.exports = Setting;
