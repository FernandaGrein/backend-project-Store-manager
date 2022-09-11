const salesModel = require('../models/saleModels');

const saveSales = async (salesBody) => {
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