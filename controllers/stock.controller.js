const Stock = require("../models/stock.model");

module.exports = {
  async index(req, res) {
    try {
      const stocks = await Stock.find()
        .populate("product_id")
        .populate("warehouse_id");

      return res.json(stocks);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
    try {
      const stock = await Stock.findById(req.params.id)
        .populate("product_id")
        .populate("warehouse_id");

      if (!stock) return res.status(404).json({ error: "Estoque não encontrado" });

      return res.json(stock);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const stock = await Stock.create(req.body);
      return res.status(201).json(stock);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      const stock = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true });

      if (!stock) return res.status(404).json({ error: "Estoque não encontrado" });

      return res.json(stock);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async destroy(req, res) {
    try {
      const deleted = await Stock.findByIdAndDelete(req.params.id);

      if (!deleted) return res.status(404).json({ error: "Estoque não encontrado" });

      return res.status(204).send();
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
