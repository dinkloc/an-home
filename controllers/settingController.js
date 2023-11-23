const Setting = require('../models/settingModel');
exports.getAllSettings = async (req, res) => {
  try {
    const setting = await Setting.find();
    res.status(200).json({
      message: 'success',
      data: {
        setting,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createSetting = async (req, res) => {
  try {
    const newSetting = await Setting.create(req.body);
    console.log(req);
    res.status(201).json({
      status: 'success',
      data: {
        newSetting,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateSetting = async (req, res) => {
  try {
    const cabin = await Setting.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
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

exports.deleteSetting = async (req, res) => {
  try {
    await Setting.findByIdAndDelete(req.params.id);
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
