const express = require("express");
const router = express.Router();
const priceAdjustment = require("../controllers/price-adjustment.controller");

router.get("/", priceAdjustment.index);
router.get("/:id", priceAdjustment.show);

module.exports = router;
