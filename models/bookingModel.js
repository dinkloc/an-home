const mongoose = require('mongoose');
const subtractDates = require('../utils/hepler');
const { isFuture, isPast, isToday } = require('date-fns');
const bookingSchema = new mongoose.Schema(
  {
    createdAt: {
      type: Date,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Handle data before save

bookingSchema.statics.calcTotalPrice = async (idCabin) => {};

bookingSchema.pre('save', async function (next) {
  this.numNight = await subtractDates(this.endDate, this.startDate);
  if (isPast(new Date(this.endDate)) && !isToday(new Date(this.endDate)))
    this.status = await 'checked-out';
  if (isFuture(new Date(this.startDate)) || isToday(new Date(this.startDate)))
    this.status = await 'unconfirmed';
  if (
    (isFuture(new Date(this.endDate)) || isToday(new Date(this.endDate))) &&
    isPast(new Date(this.startDate)) &&
    !isToday(new Date(this.startDate))
  )
    this.status = await 'checked-in';
  const { cabin } = await this.populate({
    path: 'guest cabin',
  });
  const { regularPrice, discount } = cabin;
  const cabinPrice = await (this.numNight * (regularPrice - discount));
  const extrasPrice = (await this.hasBreakFast)
    ? this.numNight * 15 * this.numGuest
    : 0;
  this.totalPrice = await (cabinPrice + extrasPrice);
  next();
});

// bookingSchema.pre('findOneAndUpdate', async function (next) {
//   console.log('pre update');
//   this.numNight = await subtractDates(this.endDate, this.startDate);
//   console.log(this.numNight);
//   if (isPast(new Date(this.endDate)) && !isToday(new Date(this.endDate)))
//     this.status = await 'checked-out';
//   if (isFuture(new Date(this.startDate)) || isToday(new Date(this.startDate)))
//     this.status = await 'unconfirmed';
//   if (
//     (isFuture(new Date(this.endDate)) || isToday(new Date(this.endDate))) &&
//     isPast(new Date(this.startDate)) &&
//     !isToday(new Date(this.startDate))
//   )
//     this.status = await 'checked-in';
//   const { cabin } = await this.populate({
//     path: 'guest cabin',
//   });
//   const { regularPrice, discount } = cabin;
//   const cabinPrice = await (this.numNight * (regularPrice - discount));
//   const extrasPrice = (await this.hasBreakFast)
//     ? this.numNight * 15 * this.numGuest
//     : 0;
//   this.totalPrice = await (cabinPrice + extrasPrice);
//   next();
// });

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guest cabin',
    select: '-__v',
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
