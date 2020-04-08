const Joi = require('@hapi/joi');

// truck validation
const truckValidation = Joi.object({
    _id: Joi.any(),
    
    created_by: Joi.string()
      .optional(),

    assigned_to: Joi.string()
    .optional(),

    status: Joi.string()
      .valid('IS', 'OL')
      .optional(),

    type: Joi.string()
      .valid('Sprinter', 'Small Straight', 'Large Straight')
      .required()
});

module.exports = truckValidation;