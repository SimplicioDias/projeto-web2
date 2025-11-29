const { StockMovement } = require('../models');

module.exports = {
  async create(req, res) {
    const { movement_type, description } = req.body;
    
    try {
      // Cria UMA único registro de movimento (cabeçalho)
      const typeMovement = await StockMovement.create({
        movement_type,
        description
      });

      return res.status(201).json({
        message: 'Stock movement created successfully',
        typeMovement

      });

    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },


  async list(req, res) {
    try {
      const list = await StockMovement.findAll({
      order: [['movement_date', 'DESC']],
        limit: 200
      });
      return res.json(list);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },

  async show(req, res) {
      try {
        const { id } = req.params;
        const movement = await StockMovement.findByPk(id);

        if (!movement) {
          return res.status(404).json({ error: 'Stock movement not found' });
        }
        return res.json(movement);

      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
  }
};
