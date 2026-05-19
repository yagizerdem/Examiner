const { ApiResponse } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const { HttpStatusCode } = require("../utils/status_codes");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;

  if (err instanceof AppError && err.isOperational) {
    return res.status(statusCode).json(
      ApiResponse.create({
        statusCode,
        message: err.message,
        errors: err.errors || null,
        data: null,
      }),
    );
  }

  // console.error(err);

  return res.status(statusCode).json(
    ApiResponse.create({
      statusCode,
      message: "Unexpected error occurred",
      errors: null,
      data: null,
    }),
  );
};
