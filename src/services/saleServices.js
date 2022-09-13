const salesModel = require('../models/saleModels');
const { validateSchemas, validadeIds } = require('./validations/validationsFunctions');
// const schema = require('./validations/schemas');

// const validateSchemas = (salesBody) => salesBody.map(({ productId, quantity }) => {
//     const validation = schema.saleSchema.validate({ productId, quantity });

//     if (validation.error && validation.error.message.includes('is required')) {
//      return { type: 400, message: validation.error.message };
//     }
    
//     if (validation.error
//       && validation.error.message === '"quantity" must be greater than or equal to 1') {
//       return { type: 422, message: validation.error.message };
//     }
//     return null;
// });

// const validadeIds = async (allIds, salesBody) => salesBody.map((item) => {
//     const findId = allIds.find((id) => item.productId === id);
//     if (findId === undefined) {
//       return { type: 404, message: 'Product not found' };
//     }
//     return null;
// });

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

const getAllSales = async () => {
  const sales = await salesModel.getAllSales();

  return { type: null, message: sales };
};

const getSalesById = async (id) => {
  const saleById = await salesModel.getSalesById(id);

  if (saleById.length === 0) {
    return { type: 404, message: 'Sale not found' };
  }

  return { type: null, message: saleById };
};

module.exports = {
  saveSales,
  getAllSales,
  getSalesById,
};