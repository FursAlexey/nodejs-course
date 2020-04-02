const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(2)
    .required(),
  login: Joi.string()
    .alphanum()
    .min(2)
    .required(),
  password: Joi.string()
    .min(4)
    .required()
});
