const express = require("express");
const router = express.Router();

const MovementItemController = require("../controllers/movement_items.controller");

router.get("/", MovementItemController.index);
router.post("/", MovementItemController.store);

module.exports = router;
