const rateLimit = require("express-rate-limit");

const createRateLimiter = (maxRequest, time) => {
  return rateLimit({
    max: maxRequest,
    windowMs: time,
    message: "To many request , please try again later ",
    standardHeaders: true,
    legacyHeaders: false,
  });
};

module.exports = { createRateLimiter };
