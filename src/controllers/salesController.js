const salesServices = require('../services/saleServices');

const addSales = async (req, res) => {
  const salebody = req.body;

  const addSale = await salesServices.saveSales(salebody);

  if (addSale.type) {
    return res.status(addSale.type).json({ message: addSale.message });
  }

  return res.status(201).json(addSale.message);
};

const getAllSales = async (_req, res) => {
  const allSales = await salesServices.getAllSales();

  return res.status(200).json(allSales.message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;

  const saleById = await salesServices.getSalesById(id);

  if (saleById.type) {
    return res.status(saleById.type).json({ message: saleById.message });
  }
  return res.status(200).json(saleById.message);
};

module.exports = {
  addSales,
  getAllSales,
  getSaleById,
};