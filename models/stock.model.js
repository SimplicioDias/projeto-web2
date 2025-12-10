const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  warehouse_id: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse", required: true },
  quantity: { type: Number, default: 0 },
  last_update: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Stock", StockSchema);
