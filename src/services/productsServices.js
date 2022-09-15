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

const deleteProduct = async (id) => {
  const affectedLines = await productsModel.deleteProduct(id);
  
  if (affectedLines === 0) {
   return { type: 404, message: 'Product not found' };
  }
  return { type: null };
};

const searchByTerm = async (term) => {
  if (!term) {
    const allProducts = await productsModel.getAllProducts();
    return allProducts;
  }
  const result = await productsModel.searchByTerm(term);
  
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProduct,
  searchByTerm,
};