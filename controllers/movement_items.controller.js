const MovementItem = require("../models/movement-items.model");

module.exports = {
  async index(req, res) {
    try {
      const items = await MovementItem.find()
        .populate("movement_id")
        .populate("product_id")
        .populate("stock_id");

      return res.json(items);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const item = await MovementItem.create(req.body);
      return res.status(201).json(item);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
