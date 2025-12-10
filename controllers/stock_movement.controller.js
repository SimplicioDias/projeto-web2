const StockMovement = require("../models/stock-movements.model");

module.exports = {
  async index(req, res) {
    try {
      const movements = await StockMovement.find();
      return res.json(movements);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const movement = await StockMovement.findById(req.params.id);
      if (!movement) return res.status(404).json({ error: "Movimento não encontrado" });

      return res.json(movement);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const movement = await StockMovement.create(req.body);
      return res.status(201).json(movement);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const movement = await StockMovement.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!movement) return res.status(404).json({ error: "Movimento não encontrado" });

      return res.json(movement);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const deleted = await StockMovement.findByIdAndDelete(req.params.id);

      if (!deleted) return res.status(404).json({ error: "Movimento não encontrado" });

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
