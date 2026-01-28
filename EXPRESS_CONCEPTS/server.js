require("dotenv").config();
const express = require("express");
const { configureCors } = require("./config/cors.config");
const {
  requestLogger,
  addTimeStamp,
} = require("./middleware/customMiddleware");
const app = express();
const { globalErrorHandler } = require("./middleware/errorHandler");
const { urlVersioning } = require("./middleware/apiVersioning");
const { createRateLimiter } = require("./middleware/rateLimiting");
const itemRoutes = require("./routes/item-routes");

const PORT = process.env.PORT || 3000;

app.use(configureCors());
app.use(createRateLimiter(2, 15 * 60 * 1000)); // 100 requests per 15 minutes
// express json middleware
app.use(express.json());
app.use(requestLogger);
app.use(addTimeStamp);

app.use(urlVersioning("v1"));
// app.use("/api/v1", headerVersioning("v1"));
// app.use("/api/v1", contentTypeVersioning("v1"));

app.use("/api/v1", itemRoutes);
app.use(globalErrorHandler);

app.listen(PORT, (req, res) => {
  console.log(`Server running on port ${PORT}`);
});
