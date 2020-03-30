const Joi = require('@hapi/joi');

// load validation
const loadValidation = Joi.object({
    _id: Joi.any(),
    created_by: Joi.string()
      .required(),

    logs: Joi.object()
      .required(),

    assigned_to: Joi.string()
      .required(),

    status: Joi.string()
      .valid('NEW', 'POSTED', 'ASSIGED', 'SHIPPED')
      .required(),

    state: Joi.string()
      .valid('En route to pick up', 
              'Arrived to Pick Up', 
              'En route to delivery', 
              'Arrived to delivery')
      .required(),

    dimensions: Joi.object().min(3)
      .required(),

    payload: Joi.number()
      .required()
})

module.exports = loadValidation;