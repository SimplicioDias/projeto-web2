const express = require("express");
const router = express.Router();

const WarehousesController = require("../controllers/warehouses.controller");

router.get("/", WarehousesController.index);
router.get("/:id", WarehousesController.show);
router.post("/", WarehousesController.store);
router.put("/:id", WarehousesController.update);
router.delete("/:id", WarehousesController.destroy);

module.exports = router;
