const mongoose = require('mongoose');

const Prompt2Schema = new mongoose.Schema({
  request: {
    type: String,
    required: true,
    trim: true
  },
  response: {
    type: String,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Prompt2', Prompt2Schema);
