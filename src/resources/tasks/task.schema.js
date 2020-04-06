const Joi = require('@hapi/joi');

module.exports = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().required(),
  userId: Joi.any(),
  boardId: Joi.string().required(),
  columnId: Joi.any()
});
