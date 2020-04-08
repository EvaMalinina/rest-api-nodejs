const Joi = require('@hapi/joi');

// user login validation
const loginValidation = Joi.object({
  _id: Joi.any(),

  username: Joi.string().required(),
  
  password: Joi.string().required()
})

module.exports = loginValidation;