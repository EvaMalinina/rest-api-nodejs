const Joi = require('@hapi/joi');

// user register validation
const registerValidation = Joi.object({
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

    password: Joi.string().min(5).required(),

    role: Joi.string().required(),

    resetPasswordToken: Joi.string(),

    resetPasswordExpires: Joi.any()
})

module.exports = registerValidation;