const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  sku: { type: String },
  name: { type: String, required: true },
  description: { type: String },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },
  markup: { type: Number, default: 1.5 },
  cost_price: { type: Number, required: true },
  selling_price: { type: Number, required: true },
  imageUrl: { type: String }
});

module.exports = mongoose.model("Product", ProductSchema);
