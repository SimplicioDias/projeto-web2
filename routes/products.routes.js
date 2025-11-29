const express = require("express");
const router = express.Router();

const products = require('../controllers/product.controller');


router.get('/', products.list);
router.get('/:id', products.get);
router.post('/', products.create);
router.put('/:id', products.update);
router.delete('/:id', products.remove);

module.exports = router;