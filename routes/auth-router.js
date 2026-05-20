const express = require("express");
const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const asyncHandler = require("../utils/asyncHandler");
const passport = require("passport");

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

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  },
);

module.exports = { router };
