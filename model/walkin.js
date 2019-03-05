const mongoose = require('mongoose');

const walkinSchema = new mongoose.Schema({
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
    default: Date.now,
  },
});

module.exports = mongoose.model('Walkin', walkinSchema);
