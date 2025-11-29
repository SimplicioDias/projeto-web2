const express = require("express");
const router = express.Router();
const movements = require('../controllers/stock_movement.controller');

router.post('/', movements.create);
router.get('/', movements.list);
router.get('/:id', movements.show)

module.exports = router;