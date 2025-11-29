const express = require("express");
const router = express.Router();

router.use("/categories", require("./categories.routes"));
router.use("/suppliers", require("./suppliers.routes"));
router.use("/warehouses", require("./warehouses.routes"));
router.use("/stocks", require("./stock.routes"));
router.use('/sotcks_movement', require('./stock_movement.routes'))
router.use('/products', require('./products.routes'));
router.use('/login', require('./auth.routes'));
router.use('/users', require('./users.routes'));
router.use('/movement', require('./movement.routes'));
router.use('/priceadjustment', require('./price_adjustment.routes'))

module.exports = router;


