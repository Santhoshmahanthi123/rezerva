const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  guest_name: {
    type: String,
    required: true,
  },
  head_count: {
    type: Number,
    required: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  tag: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);
