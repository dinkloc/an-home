const Cabin = require('../models/cabinModel');

exports.getAllCabins = async (req, res) => {
  try {
    const cabin = await Cabin.find();
    res.status(200).json({
      status: 'success',
      data: {
        cabin,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createCabin = async (req, res) => {
  try {
    const newCabin = await Cabin.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newCabin,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteCabin = async (req, res) => {
  try {
    await Cabin.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'delete success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
