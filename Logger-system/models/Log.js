const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    route: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  responseTime: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("log", logSchema)