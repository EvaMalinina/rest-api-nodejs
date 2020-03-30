const Joi = require('@hapi/joi');

// user validation
const userValidation = Joi.object({
    _id: Joi.any(),
    name: Joi.string()
        .min(3)
        .max(30)
        .required(),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    tel: Joi.string()
        .min(6)
        .max(12)
        .required(),

    password: Joi.string().required(),

    role: Joi.string().required()
})

module.exports = userValidation;