const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();
  return products;
};

const getProductById = async (id) => {
  const productById = await productsModel.getProductsById(id);
  return productById;
};

module.exports = {
  getAllProducts,
  getProductById,
};