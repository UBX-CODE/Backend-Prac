const express = require('express');

const rateLimiter = require("./middleware/rateLimiter");
const app = express();
app.use(rateLimiter);

app.get('/', (req,res) => {
    res.send("Request allowed");
});

app.listen(3000, () =>{
    console.log("server is running")
})