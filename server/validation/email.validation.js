const Joi = require('@hapi/joi');

// user login validation
const emailValidation = Joi.object({
  _id: Joi.any(),

  email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
 
})

module.exports = emailValidation;