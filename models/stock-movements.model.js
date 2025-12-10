const mongoose = require("mongoose");

const StockMovementSchema = new mongoose.Schema({
  movement_type: { 
    type: String, 
    enum: ["ENTRADA", "SAIDA", "TRANSFERENCIA"],
    required: true 
  },
  movement_date: { type: Date, default: Date.now },
  description: { type: String }
});

module.exports = mongoose.model("StockMovement", StockMovementSchema);
