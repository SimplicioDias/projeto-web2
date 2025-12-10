const mongoose = require("mongoose");

const MovementItemSchema = new mongoose.Schema({
  movement_id: { type: mongoose.Schema.Types.ObjectId, ref: "StockMovement" },
  stock_id: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
  unit_cost: { type: Number },
  total_value: { type: Number }
});

module.exports = mongoose.model("MovementItem", MovementItemSchema);
