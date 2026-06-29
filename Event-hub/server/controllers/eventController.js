const Event = require("../models/Event");
const Booking = require("../models/Booking");
const bookTicket = async(req, res) => {
  const{ eventId, seatCount} = req.body;

  try{
    const event = await Event.findOneAndUpdate(
      {
      _id: eventId,
      availableSeats: { $gte: seatCount}
    },{
      $inc: {
        availableSeats: -seatCount
      }
    },{
      new:true
    });

    if(!event){
      return res.status(400).json({
        message: "Insufficient seats available"
      })
    }

    const booking = await Booking.create({
      userId: req.user.userId,
      eventId,
      seatCount
    });

    res.json({
      message: "Booking successful",
      booking
    });
  
  const io = req.app.get("io");

  io.to(eventId).emit("seat-updated",{
    eventId,
    availableSeats: event.availableSeats
  })
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};


const createEvent = async (req, res) => {
  const { title, date, availableSeats } = req.body;

  try {
    const event = await Event.create({
      title,
      date,
      availableSeats,
      poster: req.file ? req.file.path : null,
      createdBy: req.user.userId
    });

    res.json({
      message: "Event created",
      event
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error"
    });
  }
};

module.exports = {
  createEvent,
  bookTicket
};