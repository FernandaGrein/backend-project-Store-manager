const salesModel = require('../models/saleModels');
const schema = require('./validations/schemas');

const validateSchemas = (salesBody) => salesBody.map(({ productId, quantity }) => {
    const validation = schema.saleSchema.validate({ productId, quantity });

    if (validation.error && validation.error.message.includes('is required')) {
     return { type: 400, message: validation.error.message };
    }
    
    if (validation.error
      && validation.error.message === '"quantity" must be greater than or equal to 1') {
      return { type: 422, message: validation.error.message };
    }
    return null;
});

const validadeIds = async (allIds, salesBody) => salesBody.map((item) => {
    const findId = allIds.find((id) => item.productId === id);
    if (findId === undefined) {
      return { type: 404, message: 'Product not found' };
    }
    return null;
});

const saveSales = async (salesBody) => {
  const allIds = await salesModel.getAllIds();

  const errorsArray = await validateSchemas(salesBody);
  const error = errorsArray.find((item) => item !== null);
  if (error) return error;

  const invalidArray = await validadeIds(allIds, salesBody);
  const invalidation = invalidArray.find((item) => item !== null);
  if (invalidation) return invalidation;

  const idFromSales = await salesModel.saveSales(salesBody);
  return {
    type: null,
    message: {
      id: idFromSales,
      itemsSold: salesBody,
    },
  };
};

module.exports = {
  saveSales,
};