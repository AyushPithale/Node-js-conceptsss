// custom error class

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "API Error"; // set the error type to Api error
  }
}

const asyncHandler = (fun) => (req, res, next) => {
  Promise.resolve(fun(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
  console.error(err.stack);

  //  api error
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      status: "Error",
      message: err.message,
    });
  }

  // handle mongooese valiation ->
  else if (err.name === "validationError") {
    return res.status(400).json({
      status: "error",
      message: "validation error ",
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "An unexpected error occured",
    });
  }
};

module.exports = { APIError, asyncHandler, globalErrorHandler };
