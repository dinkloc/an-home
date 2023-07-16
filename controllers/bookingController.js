const Booking = require('../models/BookingModel');

exports.getAllBookings = async (req, res) => {
  try {
    const booking = await Booking.find();
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
    console.log(req);
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
