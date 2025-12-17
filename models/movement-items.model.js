const mongoose = require("mongoose");
const Stock = require("./stock.model");
const StockMovement = require("./stock-movements.model");

const MovementItemSchema = new mongoose.Schema({
  movement_id: { type: mongoose.Schema.Types.ObjectId, ref: "StockMovement" },
  stock_id: { type: mongoose.Schema.Types.ObjectId, ref: "Stock" },
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, required: true },
  unit_cost: { type: Number },
  total_value: { type: Number },
});

// Hook pós-salvamento: atualizar estoque quando MovementItem é criado
MovementItemSchema.post("save", async function (doc) {
  try {
    // Populate para acessar o tipo de movimento
    const movementItem = await this.constructor
      .findById(doc._id)
      .populate("movement_id")
      .populate("stock_id");

    if (!movementItem || !movementItem.movement_id) return;

    const movement = movementItem.movement_id;
    const stock = movementItem.stock_id;
    const quantity = movementItem.quantity;

    if (!stock) return;

    // Lógica: aumenta ou diminui estoque conforme o tipo de movimento
    let quantityChange = 0;

    if (movement.movement_type === "ENTRADA") {
      quantityChange = quantity;
    } else if (movement.movement_type === "SAIDA") {
      quantityChange = -quantity;
    }
    // TRANSFERENCIA pode ter lógica especial se necessário

    // Atualiza o estoque
    await Stock.findByIdAndUpdate(
      stock._id,
      {
        $inc: { quantity: quantityChange },
        last_update: new Date(),
      },
      { new: true }
    );

    console.log(
      `Estoque atualizado: ${quantityChange > 0 ? "+" : ""}${quantityChange}`
    );
  } catch (err) {
    console.error("Erro ao atualizar estoque:", err.message);
  }
});

// Hook pré-deleção: reverter mudanças no estoque
MovementItemSchema.pre("findByIdAndDelete", async function (next) {
  try {
    const movementItem = await this.model
      .findOne(this.getFilter())
      .populate("movement_id")
      .populate("stock_id");

    if (!movementItem || !movementItem.movement_id) return next();

    const movement = movementItem.movement_id;
    const stock = movementItem.stock_id;
    const quantity = movementItem.quantity;

    if (!stock) return next();

    // Reverte a mudança
    let quantityChange = 0;
    if (movement.movement_type === "ENTRADA") {
      quantityChange = -quantity;
    } else if (movement.movement_type === "SAIDA") {
      quantityChange = quantity;
    }

    await Stock.findByIdAndUpdate(
      stock._id,
      {
        $inc: { quantity: quantityChange },
        last_update: new Date(),
      },
      { new: true }
    );

    next();
  } catch (err) {
    console.error("Erro ao reverter estoque:", err.message);
    next(err);
  }
});

module.exports = mongoose.model("MovementItem", MovementItemSchema);
