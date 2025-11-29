const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller"); // corrigido: usar user.controller

router.post('/', userController.create)
router.get('/', userController.list);
router.get('/:id', userController.get);
router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;