const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/user.controller");

router.get("/", UsersController.list);
router.post("/", UsersController.create);

module.exports = router;
