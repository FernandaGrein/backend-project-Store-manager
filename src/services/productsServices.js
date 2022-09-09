const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();

  // if (!products) {
  //   return { type: 404, message: 'Product not found' };
  // }
  return { type: null, message: products };
};

const getProductById = async (id) => {
  const productById = await productsModel.getProductsById(id);

  if (!productById) {
    return { type: 404, message: 'Product not found' };
  }

  return { type: null, message: productById };
};

module.exports = {
  getAllProducts,
  getProductById,
};