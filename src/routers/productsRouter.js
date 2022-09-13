const express = require('express');
const productsController = require('../controllers/productsCotroller');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductsById);

router.post('/', productsController.addNewProduct);

router.put('/:id', productsController.updateProduct);

module.exports = router;