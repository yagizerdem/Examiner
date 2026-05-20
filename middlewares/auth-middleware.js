const { User } = require("../models/user");
const { AppError } = require("../utils/app-error");
const { HttpStatusCode } = require("../utils/status_codes");
const authValidator = require("../validators/auth-validator");
const bcrypt = require("bcrypt");

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
    authValidator.registerValidator.validateAsync(body, { abortEarly: false }),
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

async function ensureCredentials(req, res, next) {
  const body = req.body;

  if (!body) {
    throw new AppError({
      message: "Request body is required",
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  }

  await Promise.resolve(
    authValidator.registerValidator.validateAsync(body, { abortEarly: false }),
  ).catch((err) => {
    throw new AppError({
      message: "Validation error",
      errors: err.details.map((detail) => detail.message),
      statusCode: HttpStatusCode.BAD_REQUEST,
      isOperational: true,
    });
  });

  // check if user exist with email
  const userFromDb = await User.findOne({ email: body.email });
  if (!userFromDb) {
    throw new AppError({
      message: "User not found with this email",
      statusCode: HttpStatusCode.NOT_FOUND,
      isOperational: true,
    });
  }

  // check passwordis correct
  const flag = await bcrypt.compare(body.password, userFromDb.password);
  if (!flag) {
    throw new AppError({
      message: "Invalid password",
      statusCode: HttpStatusCode.UNAUTHORIZED,
      isOperational: true,
    });
  }

  next();
}

module.exports = { validateRegister, ensureCredentials };
