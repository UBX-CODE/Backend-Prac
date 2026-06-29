const express = require("express");
const resumeRoutes = require("./routes/resume");
const port = 3000;
const app = express();

app.use("/resume", resumeRoutes);

app.get("/" , (req,res) => {
    res.send("Resume Parser is running");
});

app.listen(port ,() => {
    console.log(`app is running on port http://localhost:${port}`);
});