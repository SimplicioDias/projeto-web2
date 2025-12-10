const PriceAdjustment = require("../models/price-adjustment.model");

module.exports = {
  async index(req, res) {
    try {
      const adjustments = await PriceAdjustment.find()
        .populate("product_id")
        .populate("user_id");

      return res.json(adjustments);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async store(req, res) {
    try {
      const adjustment = await PriceAdjustment.create(req.body);
      return res.status(201).json(adjustment);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
