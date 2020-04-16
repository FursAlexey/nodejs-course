const Joi = require('@hapi/joi');

module.exports = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  order: Joi.number(),
  description: Joi.string(),
  userId: Joi.any(),
  boardId: Joi.string(),
  columnId: Joi.any()
});
