const AppError = require("../utils/appError");

// GLOBAL ERROR MIDDLEWARES
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.message = err.message || "Something went wrong!";

  // ERROR IN DEVELOPMENT
  if (process.env.NODE_ENV === "development")
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      isOperational: err.isOperational || false,
      error: err,
      stack: err.stack || null,
    });
  //ERROR IN PRODUCTION
  else if (process.env.NODE_ENV === "production") {
    if (err.isOperational)
      // OPERATIONAL ERROR, TRUSTED ERROR, SEND MESSAGE TO THE CLIENT.
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

    // ELSE UNKNOWN ERROR OR PROGRAMMING ERROR, SEND GENERIC MESSAGE TO CLIENT
    return res.status(err.statusCode).json({
      status: "error",
      message: "Something went very wrong!!!",
    });
  }
};
