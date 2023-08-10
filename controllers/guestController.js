const Guest = require('../models/guestModel');

exports.getAllGuests = async (req, res) => {
  try {
    const guest = await Guest.find();
    res.status(200).json({
      message: 'success',
      data: {
        guest,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createGuest = async (req, res) => {
  try {
    const newGuest = await Guest.create(req.body);
    console.log(req);
    res.status(201).json({
      status: 'success',
      data: {
        newGuest,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteGuest = async (req, res) => {
  try {
    await Guest.findByIdAndDelete(req.params.id);
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
