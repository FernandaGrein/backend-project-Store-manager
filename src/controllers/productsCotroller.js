const productsServices = require('../services/productsServices');

const getProducts = async (_req, res) => {
  const allProducts = await productsServices.getAllProducts();

  res.status(200).json(allProducts);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const productById = await productsServices.getProductById(id);

  res.status(200).json(productById);
};

module.exports = {
  getProducts,
  getProductsById,
};