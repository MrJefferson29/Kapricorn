const mongoose = require('mongoose');

const NpkSchema = new mongoose.Schema({
  nitrogen: { type: Number, required: true },
  phosphorus: { type: Number, required: true },
  potassium: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  response: { 
    crops: String,
    aiResponse: String
  }
});

const Npk = mongoose.model("Npk", NpkSchema);

module.exports = Npk;
