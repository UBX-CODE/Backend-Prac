const Log = require("../models/Log");

const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", async () => {
    const end = Date.now();

    await Log.create({
      route: req.originalUrl,
      method: req.method,
      responseTime: end - start
    });
  });

  next();
};

module.exports = loggerMiddleware;