const productsModel = require('../models/productsModel');
const schemas = require('./validations/schemas');

const getAllProducts = async () => {
  const products = await productsModel.getAllProducts();

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
  const validation = schemas.productsSchema.validate({ name: productName });

  if (validation.error && validation.error.message === '"name" is required') {
    return { type: 400, message: validation.error.message };
  }
  if (
    validation.error
    && validation.error.message === '"name" length must be at least 5 characters long') {
    return { type: 422, message: validation.error.message };
  }

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