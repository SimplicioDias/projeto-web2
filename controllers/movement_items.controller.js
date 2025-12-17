const MovementItem = require("../models/movement-items.model");
const Stock = require("../models/stock.model");

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
      const {
        movement_id,
        stock_id,
        product_id,
        quantity,
        unit_cost,
        total_value,
      } = req.body;

      // Validação: verifica se stock existe
      const stock = await Stock.findById(stock_id);
      if (!stock) {
        return res.status(404).json({ error: "Estoque não encontrado" });
      }

      // Cria o item de movimento (hook post-save atualizará estoque automaticamente)
      const item = await MovementItem.create({
        movement_id,
        stock_id,
        product_id,
        quantity,
        unit_cost,
        total_value,
      });

      // Retorna item com populações
      const populatedItem = await MovementItem.findById(item._id)
        .populate("movement_id")
        .populate("product_id")
        .populate("stock_id");

      return res.status(201).json(populatedItem);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const item = await MovementItem.findByIdAndDelete(id);
      if (!item) {
        return res.status(404).json({ error: "Item não encontrado" });
      }
      return res.json({ message: "Item deletado e estoque revertido" });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
};
