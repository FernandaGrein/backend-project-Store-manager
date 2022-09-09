const express = require('express');
const productsController = require('../controllers/productsCotroller');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductsById);

module.exports = router;