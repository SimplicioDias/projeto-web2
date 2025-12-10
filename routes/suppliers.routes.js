const express = require("express");
const router = express.Router();

const SuppliersController = require("../controllers/suppliers.controller");

router.get("/", SuppliersController.index);
router.get("/:id", SuppliersController.show);
router.post("/", SuppliersController.store);
router.put("/:id", SuppliersController.update);
router.delete("/:id", SuppliersController.destroy);

module.exports = router;
