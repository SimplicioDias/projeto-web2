const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const upload = require("../middlewares/upload"); // Multer já está configurado

router.get("/", ProductController.index);
router.post("/", upload.single("image"), ProductController.store);
router.put("/:id", upload.single("image"), ProductController.update);
router.delete("/:id", ProductController.delete);

module.exports = router;
