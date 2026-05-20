const { User } = require("../models/user");

async function registerUser({ email, password }) {
  const newUser = new User({ email, password });
  await newUser.save();
  return newUser;
}

module.exports = { registerUser };
