const Joi = require('joi');

const userSchema = Joi.object({
  userId: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid('patient', 'provider').required(),
});

const validateUser = (user) => {
  return userSchema.validate(user);
};

module.exports = {
  validateUser,
};