const productsServices = require('../services/productsServices');

const getProducts = async (_req, res) => {
  const allProducts = await productsServices.getAllProducts();

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

const addNewProduct = async (req, res) => {
  const { name } = req.body;

  const newProduct = await productsServices.addNewProduct(name);

  if (newProduct.type) {
    return res.status(newProduct.type).json({ message: newProduct.message });
  }
    
  return res.status(201).json(newProduct.message);
};

module.exports = {
  getProducts,
  getProductsById,
  addNewProduct,
};