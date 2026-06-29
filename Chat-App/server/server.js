const express = require("express");
const http = require("http");
const {Server} = require("socket.io");

const app = express();
const server = http.createServer(app);

// socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

app.get("/", (req,res) => {
    res.send("server is running");
});

//socket connection
io.on("connection", (socket) => {
    console.log("User connected", socket.id);

//join room
socket.on("join-room",(room) =>{
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
    });


// New: send message
socket.on("send-message",(room, message)=>{
    socket.to(room).emit("receive-message",{
        message,
        sender: socket.id,
        time: new Date().toLocaleTimeString()
    });
})
});

server.listen(3000, () => {
    console.log("server is running on port 3000");
});