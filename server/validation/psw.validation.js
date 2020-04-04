const Joi = require('@hapi/joi');

// user login validation
const pswValidation = Joi.object({
  _id: Joi.any(),

  password: Joi.string().min(5).required()
})

module.exports = pswValidation;