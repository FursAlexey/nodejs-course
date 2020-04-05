const Joi = require('@hapi/joi');

module.exports = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array().items(
    Joi.object({
      title: Joi.string().required(),
      order: Joi.number().required()
    })
  )
});
