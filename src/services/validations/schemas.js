const Joi = require('joi');

const productsSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.empty': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
});

const saleSchema = Joi.object({
  productId: Joi.number().required().messages({
    'string.empty': '"productId" is required',
  }),
  quantity: Joi.number().integer().min(1).required()
.messages({
    'string.empty': '"quantity" is required',
    'string.min': '"quantity" must be greater than or equal to 1',
  }),
});

module.exports = {
  productsSchema,
  saleSchema,
};