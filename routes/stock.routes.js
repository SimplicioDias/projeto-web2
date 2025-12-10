const express = require("express");
const router = express.Router();

const StocksController = require("../controllers/stock.controller");

router.get("/", StocksController.index);
router.get("/:id", StocksController.show);
router.post("/", StocksController.store);
router.put("/:id", StocksController.update);
router.delete("/:id", StocksController.destroy);

module.exports = router;
