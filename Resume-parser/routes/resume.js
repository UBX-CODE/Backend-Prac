const express = require("express");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const upload = require("../middleware/upload");

const router = express.Router();


router.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    const dataBuffer = fs.readFileSync(req.file.path);


    const pdfData = await pdfParse(dataBuffer);

    fs.unlinkSync(req.file.path);

    const text = pdfData.text;

// extract email
const emailMatch = text.match(
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/
);

// extract skills (simple keyword search)
const skills = [];

const skillList = [
  "JavaScript",
  "Node.js",
  "React",
  "MongoDB",
  "Python",
  "Java"
];

skillList.forEach((skill) => {
  if (text.toLowerCase().includes(skill.toLowerCase())) {
    skills.push(skill);
  }
});

// extract name (very basic assumption: first line)
const name = text.split("\n")[0];

res.json({
  name,
  email: emailMatch ? emailMatch[0] : null,
  skills
});

    res.json({
      message: "PDF parsed successfully",
      text: pdfData.text
    });

  } catch (err) {
    console.log(err);

    if (req.file && fs.existsSync(req.file.path)) {
    fs.unlinkSync(req.file.path);
  }

    res.status(500).json({
      message: "Error parsing PDF"
    });
  }
});

module.exports = router;