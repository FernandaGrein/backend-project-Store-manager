const salesModel = require('../models/saleModels');
const { validateSchemas, validadeIds } = require('./validations/validationsFunctions');

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

const deleteSale = async (id) => {
  const affectedLines = await salesModel.deleteSale(id);

  if (affectedLines === 0) {
    return { type: 404, message: 'Sale not found' };
  }
  return { type: null };
};

module.exports = {
  saveSales,
  getAllSales,
  getSalesById,
  deleteSale,
};