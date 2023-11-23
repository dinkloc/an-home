const { subDays } = require('date-fns');
const Booking = require('../models/bookingModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllBookings = async (req, res) => {
  try {
    const features = new APIFeatures(Booking.find(), req.query).paginate();
    const booking = await features.query;
    res.status(200).json({
      status: 'success',
      results: booking.length,
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newBooking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: booking,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'deleted success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getBookingStats = async (req, res) => {
  const today = new Date();
  const date = subDays(today, req.params.day);
  try {
    const stats = await Booking.find({
      createdAt: { $gte: date, $lt: today },
    });

    console.log(date);
    res.status(200).json({
      status: 'success',
      results: stats.length,
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getStayAfterDate = async (req, res) => {
  const today = new Date();
  const date = subDays(today, req.params.day);
  try {
    const stats = await Booking.find({
      startDate: { $gte: date, $lt: today },
    });

    console.log(date);
    res.status(200).json({
      status: 'success',
      results: stats.length,
      data: {
        stats,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
