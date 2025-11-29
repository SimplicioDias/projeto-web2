const express = require("express");
const router = express.Router();
const StockController = require("../controllers/stock.controller"); // corrigido para o arquivo singular

router.get("/", StockController.index);
router.get("/:id", StockController.show);
/* router.post("/", StockController.store); */
/* router.put("/:id", StockController.update); */
/* router.delete("/:id", StockController.destroy); */

module.exports = router;
