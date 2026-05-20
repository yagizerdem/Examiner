const { HttpStatusCode } = require("../utils/status_codes");
const { ApiResponse } = require("../utils/api-response");
const { AppError } = require("../utils/app-error");
const userService = require("../service/user-service");

async function register(req, res) {
  const { email, password } = req.body;
  await userService.registerUser({ email, password });

  return res
    .status(HttpStatusCode.OK)
    .json(ApiResponse.ok({ message: "User registered successfully" }));
}

module.exports = { register };
