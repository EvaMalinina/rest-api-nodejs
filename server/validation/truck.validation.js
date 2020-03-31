const Joi = require('@hapi/joi');

// truck validation
const truckValidation = Joi.object({
    _id: Joi.any(),
    
    created_by: Joi.string()
      .required(),

    assigned_to: Joi.string()
      .required(),

    status: Joi.string()
      .valid('IS', 'OL')
      .required(),

    type: Joi.string()
      .valid('Sprinter', 'Small Straight', 'Large Straight')
      .required()
});

module.exports = truckValidation;