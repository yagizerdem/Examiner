const { AppError } = require("../utils/app-error");
const { HttpStatusCode } = require("../utils/status_codes");
const authValidator = require("../validators/auth-validator");

async function validateRegister(req, res, next) {
  const body = req.body;

  if (!body) {
    throw new AppError({
      message: "Request body is required",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  await Promise.resolve(
    authValidator.registerValidator.validateAsync(body),
  ).catch((err) => {
    throw new AppError({
      message: "Validation error",
      errors: err.details.map((detail) => detail.message),
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  });
  next();
}

module.exports = { validateRegister };
