const Category = require("../models/category.model");

module.exports = {
  async index(req, res) {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ error: "Categoria não encontrada" });

      return res.json(category);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const category = await Category.create(req.body);
      return res.status(201).json(category);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const updated = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!updated) return res.status(404).json({ error: "Categoria não encontrada" });

      return res.json(updated);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const deleted = await Category.findByIdAndDelete(req.params.id);

      if (!deleted) return res.status(404).json({ error: "Categoria não encontrada" });

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
