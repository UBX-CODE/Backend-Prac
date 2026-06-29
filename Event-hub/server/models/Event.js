const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    required: true
  },

  availableSeats: {
    type: Number,
    required: true
  },

  poster: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Event", eventSchema);