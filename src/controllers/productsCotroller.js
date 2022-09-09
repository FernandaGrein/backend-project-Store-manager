const productsServices = require('../services/productsServices');

const getProducts = async (_req, res) => {
  const allProducts = await productsServices.getAllProducts();

  // if (allProducts.type) {
  //   return res.status(allProducts.type).json(allProducts.message);
  // }

  res.status(200).json(allProducts.message);
};

const getProductsById = async (req, res) => {
  const { id } = req.params;

  const productById = await productsServices.getProductById(id);

  if (productById.type) {
    return res.status(productById.type).json({ message: productById.message });
  }

  res.status(200).json(productById.message);
};

module.exports = {
  getProducts,
  getProductsById,
};