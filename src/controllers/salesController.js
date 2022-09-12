const salesServices = require('../services/saleServices');

const addSales = async (req, res) => {
  const salebody = req.body;

  const addSale = await salesServices.saveSales(salebody);

  if (addSale.type) {
    return res.status(addSale.type).json({ message: addSale.message });
  }

  return res.status(201).json(addSale.message);
};

module.exports = {
  addSales,
};