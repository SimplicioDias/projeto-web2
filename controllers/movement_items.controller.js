const { MovementItem, StockMovement, sequelize } = require('../models');

module.exports = {

  async create(req, res) {
    const { movement_id, items } = req.body;

    if (!movement_id)
      return res.status(400).json({ error: 'movement_id is required' });

    if (!Array.isArray(items) || items.length === 0)
      return res.status(400).json({ error: 'items array is required' });

    try {
      // Verifica se o movimento existe
      const movement = await StockMovement.findByPk(movement_id);
      if (!movement)
        return res.status(404).json({ error: 'StockMovement not found' });

      // Prepara os dados
      const records = items.map(item => ({
        movement_id,
        stock_id: item.stock_id,
        product_id: item.product_id,
        quantity: item.quantity
      }));

      // Insere todos de uma vez
      const createdItems = await MovementItem.bulkCreate(records);

      return res.status(201).json({
        message: "Movement items inserted successfully",
        count: createdItems.length,
        createdItems
      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const items = await MovementItem.findAll({
        include: [{ 
          model: StockMovement,
          attributes: ['id', 'movement_type', 'movement_date', 'description'],
          required: false
        }],
        order: [['id', 'DESC']],
        limit: 200
      });

      return res.json(items);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  // Mostrar 1 item por ID
  async show(req, res) {
    try {
      const { id } = req.params;

      const item = await MovementItem.findByPk(id, {
        include: [{ 
          model: StockMovement,
          attributes: ['id', 'movement_type', 'movement_date', 'description'],
          required: false
        }]
      });

      if (!item)
        return res.status(404).json({ error: 'MovementItem not found' });

      return res.json(item);

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
