const express = require("express");
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.post(
  "/register",
  asyncHandler(authMiddleware.validateRegister),
  asyncHandler(authController.register),
);

module.exports = { router };
