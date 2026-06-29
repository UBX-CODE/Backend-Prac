const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const authMiddleware = require("./middleware/authMiddleware");

require ("dotenv").config();

const app = express();

app.use(express.json());

//DB connect
mongoose.connect("mongodb://127.0.0.1:27017/authDB")
.then(() => console.log("MongoDb connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("Auth system running...");
});

//protected route
app.get("/protected",authMiddleware, (req,res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
});

app.use("/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server is running")
});