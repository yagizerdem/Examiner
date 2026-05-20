const Joi = require("joi");

const registerValidator = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { registerValidator };
