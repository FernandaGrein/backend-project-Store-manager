const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  productsSchema,
};