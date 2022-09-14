const express = require('express');
const salesController = require('../controllers/salesController');

const router = express.Router();

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getSaleById);

router.post('/', salesController.addSales);

router.delete('/:id', salesController.deleteSale);

module.exports = router;