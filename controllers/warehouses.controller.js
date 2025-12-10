const Warehouse = require("../models/warehouse.model");

module.exports = {
  async index(req, res) {
    try {
      const warehouses = await Warehouse.find();
      return res.json(warehouses);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const warehouse = await Warehouse.findById(req.params.id);
      if (!warehouse) return res.status(404).json({ error: "Depósito não encontrado" });

      return res.json(warehouse);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const warehouse = await Warehouse.create(req.body);
      return res.status(201).json(warehouse);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const warehouse = await Warehouse.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!warehouse) return res.status(404).json({ error: "Depósito não encontrado" });

      return res.json(warehouse);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const deleted = await Warehouse.findByIdAndDelete(req.params.id);

      if (!deleted) return res.status(404).json({ error: "Depósito não encontrado" });

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
