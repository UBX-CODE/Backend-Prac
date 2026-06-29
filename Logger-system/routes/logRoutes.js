const express = require("express");
const Log = require("../models/Log");

const router = express.Router();

// get all logs
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find().sort({ timestamp: -1 });

    res.json(logs);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching logs"
    });
  }
});

router.get("/summary" , async(req, res) => {
  try{
    const log = await Log.find();

    const totalRequest = log.length;

    const totalTime = log.reduce((sum, log) => {
      return sum + log.responseTime;
    } , 0);

    const averageResponseTime = totalRequest > 0 ? totalTime / totalRequest : 0;
    
    const getRequests = log.filter((log) => log.method === "GET").length;
    const postRequests = log.filter((log) => log.method === "POST").length;

    res.json({
      totalRequest,
      averageResponseTime,
      getRequests,
      postRequests
    });
  } catch (err) {
    
  console.log(err);

  res.status(500).json({
    message: "Error generating summary"
  });
  }
});

router.get("/filter", async (req, res) => {
  try {
    const { route, date } = req.query;

    let filter = {};

    if (route) {
      filter.route = route;
    }

    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);

      endDate.setDate(endDate.getDate() + 1);

      filter.timestamp = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const logs = await Log.find(filter);

    res.json(logs);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error filtering logs"
    });
  }
});

module.exports = router;