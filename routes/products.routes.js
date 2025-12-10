const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/product.controller");
const upload = require("../config/multer");

router.get("/", ProductsController.list);

router.get("/:id", ProductsController.get);

router.post("/", upload.single("image"), ProductsController.create);

router.put("/:id", ProductsController.update);

router.delete("/:id", ProductsController.remove);

module.exports = router;
