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

router.post(
  "/login",
  asyncHandler(authMiddleware.ensureCredentials),
  asyncHandler(authController.login),
);

router.get("/is-logged-in", asyncHandler(authController.isLoggedIn));

router.post("/logout", asyncHandler(authController.logout));

module.exports = { router };
