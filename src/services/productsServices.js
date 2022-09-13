const productsModel = require('../models/productsModel');
const { nameValidation } = require('./validations/validationsFunctions');

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
  const validate = nameValidation(productName);
  if (validate) return validate;

  const idFromInsert = await productsModel.insertProduct(productName);

  return {
    type: null,
    message: { id: idFromInsert, name: productName },
  };
};

const updateProduct = async (id, product) => {
  const validate = nameValidation(product);
  if (validate) return validate;

  const affectedLines = await productsModel.editProduct(id, product);

  if (affectedLines === 0) {
    return { type: 404, message: 'Product not found' };
  }
  return { type: null, message: { id, name: product } };
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
};