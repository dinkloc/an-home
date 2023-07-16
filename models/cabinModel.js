const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  name: {
    type: String,
    unique: true,
    require: [true, 'a cabin must have a name'],
  },
  maxCapacity: {
    type: Number,
  },
  regularPrice: {
    type: Number,
    require: [true, 'a cabin must have a price'],
  },
  discount: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
});

const Cabin = mongoose.model('Cabin', cabinSchema);

module.exports = Cabin;
