const express = require ("express");
const mongoose = require ("mongoose");

const app= express();
const port = 3000;
const loggerMiddleware = require("./middleware/loggerMiddleware");
const logRoutes = require("./routes/logRoutes");

app.use(express.json());

app.use(loggerMiddleware);

mongoose.connect("mongodb://127.0.0.1:27017/loggerDB")
.then(() => {
    console.log("mongodb is connected");
})
.catch(err => {
    console.log(err);
});

app.use("/logs", logRoutes);

app.get("/" , (req,res) => {
    res.send("logger system is running")
});



app.listen(port , () => {
    console.log(`app is running at http://localhost:${3000}`)
})
