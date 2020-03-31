const Joi = require('@hapi/joi');

// user login validation
const loginValidation = Joi.object({
  _id: Joi.any(),

  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

  password: Joi.string().required()
})

module.exports = loginValidation;