const productsModel = require('../models/productsModel');
const productSchema = require('./validations/schemas');

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

const addNewProduct = async (productName) => {
  const { error } = productSchema.validate({ productName });
  console.log('erro validacao', error);
  if (error) return { type: 400, message: error.message };

  const idFromInsert = await productsModel.insertProduct(productName);

  return {
    type: null,
    message: { id: idFromInsert, name: productName },
  };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
};