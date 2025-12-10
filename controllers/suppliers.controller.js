const Supplier = require("../models/supplier.model");

module.exports = {
  async index(req, res) {
    try {
      const suppliers = await Supplier.find();
      return res.json(suppliers);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const supplier = await Supplier.findById(req.params.id);
      if (!supplier) return res.status(404).json({ error: "Fornecedor não encontrado" });

      return res.json(supplier);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const supplier = await Supplier.create(req.body);
      return res.status(201).json(supplier);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const supplier = await Supplier.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!supplier) return res.status(404).json({ error: "Fornecedor não encontrado" });

      return res.json(supplier);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const deleted = await Supplier.findByIdAndDelete(req.params.id);

      if (!deleted) return res.status(404).json({ error: "Fornecedor não encontrado" });

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
