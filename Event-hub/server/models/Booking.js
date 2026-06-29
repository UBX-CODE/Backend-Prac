const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true
  },

  seatCount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: "confirmed"
  }
});

module.exports = mongoose.model(
  "Booking",
  bookingSchema
);