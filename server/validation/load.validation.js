const Joi = require('@hapi/joi');

// load validation
const loadValidation = Joi.object({
    _id: Joi.any(),
    created_by: Joi.string()
      .optional(),

    logs: Joi.object()
      .optional(),

    assigned_to: Joi.string()
      .optional(),

    status: Joi.string()
      .valid('NEW', 'POSTED', 'ASSIGNED', 'SHIPPED')
      .optional(),

    state: Joi.string()
      .valid( '',
              'En route to pick up', 
              'Arrived to Pick Up', 
              'En route to delivery', 
              'Arrived to delivery')
      .optional(),

    dimensions: Joi.object().min(3)
      .required(),

    payload: Joi.number()
      .required(),

    __v: Joi.number().optional(),
})

module.exports = loadValidation;