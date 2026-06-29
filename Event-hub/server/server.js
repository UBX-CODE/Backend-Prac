const express = require ("express");
const mongoose = require("mongoose");
const http = require ("http");
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
const {Server} = require("socket.io");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/eventhubDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/auth", authRoutes);
app.use("/events", eventRoutes);

const server = http.createServer(app);
         
const io = new Server(server);
app.set("io", io);

const loggerMiddleware = require("./middleware/loggerMiddleware");
app.use(loggerMiddleware);

io.on("connection", (socket) => {
  console.log("User connected" , socket.io);

  socket.on("join-event", (eventId) => {
    socket.join(eventId);
  })
})

app.get("/", (req,res) =>{
    res.send("event hub is running");
})
    
app.listen(3000 , () => {
    console.log(`server is running on http://localhost:${3000}`);
})