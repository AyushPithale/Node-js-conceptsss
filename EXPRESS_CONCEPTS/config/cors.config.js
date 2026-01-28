const cors = require("cors");

const configureCors = () => {
  return cors({
    //origin -->  which origin is allowed to access the backend API  from user side
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000", // local dev
        "https://yourdomain.com", // production url
      ];

      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true); // true means the origin is allowed to access the APIS
      } else {
        callback(new Error("NOT allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Content-Range"],
    credentials: true, //  enable support for cookies vary importent
    preflightContinue: false,
    maxAge: 600, // cache preflight reposnses for 10 mins (600 seconds)
    // -> avoid sending options request multiple times
    optionsSuccessStatus: 204,
  });
};

module.exports = { configureCors };
