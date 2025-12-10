const express = require("express");
const router = express.Router();

router.use("/categories", require("./categories.routes"));
router.use("/products", require("./products.routes"));
router.use("/suppliers", require("./suppliers.routes"));
router.use("/warehouses", require("./warehouses.routes"));
router.use("/stocks", require("./stock.routes"));
router.use("/stock_movement", require("./stock_movement.routes"));
router.use("/movement_item", require("./movement.routes"));
router.use("/price_adjustment", require("./price_adjustment.routes"));
router.use("/users", require("./users.routes"));
router.use("/login", require("./auth.routes"));

module.exports = router;
