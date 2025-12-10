const mongoose = require("mongoose");

const PriceAdjustmentSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  old_price: { type: Number },
  new_price: { type: Number },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  date_adjustments: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PriceAdjustment", PriceAdjustmentSchema);
