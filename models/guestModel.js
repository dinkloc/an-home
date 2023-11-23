const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  fullName: {
    type: String,
    require: [true, 'a guest must have name'],
  },
  email: {
    type: String,
  },
  nationality: {
    type: String,
  },
  country: {
    type: String,
  },
  nationId: {
    type: String,
  },
  countryFlag: {
    type: String,
  },
});

const Guest = mongoose.model('Guest', guestSchema);
module.exports = Guest;
