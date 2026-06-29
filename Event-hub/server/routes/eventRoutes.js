const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {createEvent, bookTicket} = require("../controllers/eventController");
const upload = require("../middleware/uploadMiddleware");
const rateLimiter = require("../middleware/rateLimiter");
const router = express.Router();

router.post("/create", authMiddleware,upload.single("poster"),createEvent);
router.post("/book", authMiddleware, rateLimiter, bookTicket)

module.exports = router;