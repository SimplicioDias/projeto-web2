const express = require("express");
const router = express.Router();

const PriceAdjustmentController = require("../controllers/price-adjustment.controller");

router.get("/", PriceAdjustmentController.index);
router.post("/", PriceAdjustmentController.store);

module.exports = router;
