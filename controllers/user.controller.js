const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {

  async list(req, res) {
    const user = await User.findAll();
    return res.json(user);
  },
  async get(req, res) {
    const u = await User.findByPk(req.params.id);
    if (!u) return res.status(404).json({ error: 'User não encontrado' });
    return res.json(u);
  },
  async create(req, res) {
    try {
      const { name, email, password } = req.body;
      const password_hash = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password_hash });
      return res.status(201).json({ id: user.id, name: user.name, email: user.email });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  },
  async update(req, res) {
    await User.update(req.body, { where: { id: req.params.id } });
    return res.json({ ok: true });
  },
  async remove(req, res) {
    await User.destroy({ where: { id: req.params.id } });
    return res.json({ ok: true });
  }
};
