var jwt = require("jsonwebtoken");

const { HttpStatusCode } = require("../utils/status_codes");
const { ApiResponse } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const userService = require("../service/user-service");
const { User } = require("../models/user");

async function register(req, res) {
  const { email, password } = req.body;
  await userService.registerUser({ email, password });

  return res
    .status(HttpStatusCode.CREATED)
    .json(ApiResponse.ok({ message: "User registered successfully" }));
}

async function login(req, res) {
  const { email, password } = req.body;

  const userFromDb = await User.findOne({ email });

  const JWT_EXPIRES_IN = "60d";
  const COOKIE_EXPIRES_IN = 60 * 24 * 60 * 60 * 1000; // 60 days

  var token = jwt.sign(
    { id: userFromDb._id, email: userFromDb.email },
    process.env.JWT_KEY,
    {
      algorithm: "HS256",
      expiresIn: JWT_EXPIRES_IN,
    },
  );

  res.cookie("jwt", token, {
    maxAge: COOKIE_EXPIRES_IN,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok({ message: "User logged in successfully" }));
}

async function isLoggedIn(req, res) {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AppError({
      message: "Unauthorized",
      statusCode: HttpStatusCode.UNAUTHORIZED,
      isOperational: true,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
  } catch (err) {
    throw new AppError({
      message: "Unauthorized",
      statusCode: HttpStatusCode.UNAUTHORIZED,
      isOperational: true,
    });
  }

  res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok({ message: "User is logged in" }));
}

async function logout(req, res) {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok({ message: "User logged out successfully" }));
}

module.exports = { register, login, isLoggedIn, logout };
