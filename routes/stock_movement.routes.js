const express = require("express");
const router = express.Router();

const MovementController = require("../controllers/stock_movement.controller");

router.get("/", MovementController.index);
router.get("/:id", MovementController.show);
router.post("/", MovementController.store);
router.put("/:id", MovementController.update);
router.delete("/:id", MovementController.destroy);

module.exports = router;
