const Log = require("../models/Log");

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    const end = Date.now();
    const responseTime = end - start;

    await Log.create({
      route: req.originalUrl,
      method: req.method,
      responseTime
    });
  });

  next();
};

module.exports = loggerMiddleware;