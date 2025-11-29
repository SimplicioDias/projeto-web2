const express = require("express");
const router = express.Router();
const CategoriesController = require("../controllers/categories.controller");

// GET /categories
router.get("/", CategoriesController.index);

// GET /categories/:id
router.get("/:id", CategoriesController.show);

// POST /categories
router.post("/", CategoriesController.store);

// PUT /categories/:id
router.put("/:id", CategoriesController.update);

// DELETE /categories/:id
router.delete("/:id", CategoriesController.destroy);

module.exports = router;
