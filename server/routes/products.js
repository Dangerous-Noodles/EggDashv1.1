const express = require('express');

const router = express.Router();

const productsController = require('../controllers/productsController');

router.get('/', productsController.getAllProducts, (req, res) => {
  res.status(200).json([...res.locals.products]);
});

router.put('/purchase', productsController.decrementProducts, (req, res) => {
  res.status(200).json(res.locals.products);
});

module.exports = router;
