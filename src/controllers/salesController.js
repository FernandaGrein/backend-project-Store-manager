const salesServices = require('../services/saleServices');

const addSales = async (req, res) => {
  const salebody = req.body;

  const addSale = await salesServices.saveSales(salebody);

  return res.status(201).json(addSale.message);
};

module.exports = {
  addSales,
};