const express = require('express');
const productsController = require('../controllers/productsCotroller');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/search', productsController.searchByTerm);

router.get('/:id', productsController.getProductsById);

router.post('/', productsController.addNewProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;