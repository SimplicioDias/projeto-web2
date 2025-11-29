const { Product } = require('../models');

module.exports = {
  async list(req, res) {
    const products = await Product.findAll();
    return res.json(products);
  },
  async get(req, res) {
    const p = await Product.findByPk(req.params.id);
    if (!p) return res.status(404).json({ error: 'Produto não encontrado' });
    return res.json(p);
  },
  async create(req, res) {
    const novo = await Product.create(req.body);
    return res.status(201).json(novo);
  },
  async update(req, res) {
    await Product.update(req.body, { where: { id: req.params.id } });
    return res.json({ ok: true });
  },
  async remove(req, res) {
    await Product.destroy({ where: { id: req.params.id } });
    return res.json({ ok: true });
  }
};
