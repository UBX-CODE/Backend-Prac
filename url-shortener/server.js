const Url = require("./models/Url");
const{nanoid} = require ("nanoid");
const express = require("express");
const mongoose = require("mongoose");

const app = express();

//connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/urlShortener")
.then(() => {
    console.log("connected to mongodb");
})
.catch((err) => {
    console.log("error connecting to mongodb", err);
});

//middlewalre to parse JSON
app.use(express.json());

app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    let shortId;
    let existing;

    // keep generating until unique
    do {
      shortId = nanoid(6);
      existing = await Url.findOne({ shortId });
    } while (existing);

    const newUrl = await Url.create({
      originalUrl,
      shortId,
    });

    const existingUrl = await Url.findOne({ originalUrl });

  if (existingUrl) {
  return res.json({
    shortUrl: `http://localhost:3000/${existingUrl.shortId}`,
  });
}
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;

  try {
    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).send("URL not found");
    }

    res.redirect(url.originalUrl);

  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});